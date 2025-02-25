import { B1_STATUS, P, STEEL_STATUS, STRAIN_STATUS } from '../constants';

const DesignResults = ({ results }) => {
  const {
    Rn,
    fc,
    b1,
    b1Status,
    pmin1,
    pmin2,
    pmin,
    pmax,
    pact,
    p,
    pgovern,
    As,
    a,
    c,
    fs,
    steelStatus,
    esmax = null,
    es = null,
    strainStatus = null,
    phimax = null,
    barDia = null,
    barsCount = null,
    finalCount = null,
  } = results;

  return (
    <div className='mt-6 p-4 bg-gray-50 rounded-md'>
      <h3 className='text-lg font-bold mb-3'>Results:</h3>
      <div className='space-y-3'>
        <div>
          <p className='font-semibold'>
            Step #1: Coefficient of Resisting Moment
          </p>
          <p>Assume Φ = 0.90</p>
          <p>
            R<sub className='text-sm'>n</sub> = (M
            <sub className='text-sm'>u</sub> * 10
            <sup className='text-sm'>6</sup>) / (Φ * b * d
            <sup className='text-sm'>2</sup>)
          </p>
          <p>
            R<sub className='text-sm'>n</sub>= {Rn.toFixed(4)} kN-m
          </p>
        </div>

        <div>
          <p className='font-semibold'>Step #2: Steel Ratios</p>
          {b1Status === B1_STATUS.NORMAL_STRENGTH ? (
            <p>
              Since f<sub className='text-sm'>c</sub>' = {fc} is ≤ 28 MPa and ≥
              17 MPa
            </p>
          ) : b1Status === B1_STATUS.HIGH_STRENGTH ? (
            <p>
              Since f<sub className='text-sm'>c</sub>' = {fc} is {'>'} 28 MPa
              and {'<'} 55 MPa, use the formula: 0.85 - ((0.05 * (f
              <sub className='text-sm'>c</sub>' - 28)) / 7)
            </p>
          ) : (
            <p>
              Since f<sub className='text-sm'>c</sub>' = {fc} is {'>'} 55 MPa
            </p>
          )}
          <p>
            ∴ β<sub className='text-sm'>1</sub> = {b1.toFixed(4)}
          </p>
          <p>
            ρ<sub className='text-sm'>min1</sub>= {pmin1.toFixed(4)}
          </p>
          <p>
            ρ<sub className='text-sm'>min2</sub>= {pmin2.toFixed(4)}
          </p>
          <p>
            ρ<sub className='text-sm'>min</sub>= {pmin.toFixed(4)}
          </p>
          <p>
            ρ<sub className='text-sm'>act</sub>= {pact.toFixed(4)}
          </p>
          <p>
            ρ<sub className='text-sm'>max</sub>= {pmax.toFixed(4)}
          </p>
        </div>

        <div>
          <p className='font-semibold'>Step #3: SRB or DRB</p>
          {pgovern === P.P_MIN && (
            <>
              <p>
                Since ρ<sub className='text-sm'>min</sub> ≥ ρ
                <sub className='text-sm'>act</sub>
              </p>
              <p>
                ∴ SRB, use ρ<sub className='text-sm'>min</sub> ={' '}
                {pmin.toFixed(4)}
              </p>
            </>
          )}
          {pgovern === P.P_ACT && (
            <>
              <p>
                Since ρ<sub className='text-sm'>act</sub> {'>'} ρ
                <sub className='text-sm'>min</sub> and ρ
                <sub className='text-sm'>act</sub> ≤ ρ
                <sub className='text-sm'>max</sub>
              </p>
              <p>
                ∴ DRB, use ρ<sub className='text-sm'>act</sub> ={' '}
                {pact.toFixed(4)}
              </p>
            </>
          )}
          {pgovern === P.P_MAX && (
            <>
              <p>
                Since ρ<sub className='text-sm'>act</sub> {'>'} ρ
                <sub className='text-sm'>max</sub>
              </p>
              <p>
                ∴ DRB, However, if the problem only provide steel at the tension
                side, use SRB analysis and use ρ
                <sub className='text-sm'>max</sub> = {pmax.toFixed(4)}
              </p>
            </>
          )}
        </div>

        <div>
          <p className='font-semibold'>Step #4: Area of Steel</p>
          <p>
            As
            {pgovern === P.P_MIN ? (
              <>
                <sub className='text-sm'>min</sub>
              </>
            ) : pgovern === P.P_ACT ? (
              <>
                <sub className='text-sm'>act</sub>
              </>
            ) : (
              <>
                <sub className='text-sm'>max</sub>
              </>
            )}{' '}
            = ρ
            {pgovern === P.P_MIN ? (
              <>
                <sub className='text-sm'>min</sub>
              </>
            ) : pgovern === P.P_ACT ? (
              <>
                <sub className='text-sm'>act</sub>
              </>
            ) : (
              <>
                <sub className='text-sm'>max</sub>
              </>
            )}{' '}
            * b * d
          </p>
          <p>
            As
            {pgovern === P.P_MIN ? (
              <>
                <sub className='text-sm'>min</sub>
              </>
            ) : pgovern === P.P_ACT ? (
              <>
                <sub className='text-sm'>act</sub>
              </>
            ) : (
              <>
                <sub className='text-sm'>max</sub>
              </>
            )}{' '}
            = {As.toFixed(4)} mm<sup className='text-sm'>2</sup>
          </p>
        </div>

        <div>
          <p className='font-semibold'>Step #5: C = T (assume S.Y)</p>
          <p>
            0.85 * f<sub className='text-sm'>c</sub>' * a * b = As
            {pgovern === P.P_MIN ? (
              <>
                <sub className='text-sm'>min</sub>
              </>
            ) : pgovern === P.P_ACT ? (
              <>
                <sub className='text-sm'>act</sub>
              </>
            ) : (
              <>
                <sub className='text-sm'>max</sub>
              </>
            )}{' '}
            * f<sub className='text-sm'>y</sub>
          </p>
          <p>a = {a.toFixed(4)} mm</p>
          <p>c = {c.toFixed(4)} mm</p>
        </div>

        <div>
          <p className='font-semibold'>Step #6: Stress Check</p>
          <p>
            f<sub className='text-sm'>s</sub> = {fs.toFixed(4)} MPa
          </p>
          {steelStatus === STEEL_STATUS.SY ? (
            <>
              <p>
                f<sub className='text-sm'>s</sub> {'>'} f
                <sub className='text-sm'>y</sub>
              </p>
              <p>∴ Steel Yields!</p>
            </>
          ) : (
            <>
              <p>
                f<sub className='text-sm'>s</sub> {'<'} f
                <sub className='text-sm'>y</sub>
              </p>
              <p>∴ Steel Does Not Yield! DRB Analysis Needed!</p>
            </>
          )}
        </div>

        {steelStatus === STEEL_STATUS.SY && (
          <div>
            <p className='font-semibold'>Step #7: Strain Check</p>
            <p>
              ε<sub className='text-sm'>s</sub> = {es.toFixed(4)}
            </p>
            {strainStatus === STRAIN_STATUS.TENSION_CONTROLLED ? (
              <>
                <p>
                  ε<sub className='text-sm'>s</sub> {'>'} {esmax}
                </p>
                <p>∴ Tension Controlled, use Φ = {phimax}</p>
              </>
            ) : (
              <>
                <p>
                  ε<sub className='text-sm'>s</sub> {'<'} {esmax}
                </p>
                <p>∴ DRB Analysis Needed!</p>
              </>
            )}
          </div>
        )}

        {strainStatus === STRAIN_STATUS.TENSION_CONTROLLED && (
          <div>
            <p className='font-semibold'>Step #8: Number of Bars</p>
            <p>
              As
              {pgovern === P.P_MIN ? (
                <>
                  <sub className='text-sm'>min</sub>
                </>
              ) : pgovern === P.P_ACT ? (
                <>
                  <sub className='text-sm'>act</sub>
                </>
              ) : (
                <>
                  <sub className='text-sm'>max</sub>
                </>
              )}{' '}
              = {As.toFixed(4)} mm<sup className='text-sm'>2</sup>
            </p>
            <p>Bar Diameter (⌀) = {barDia} mm</p>
            <p>
              n = As
              {pgovern === P.P_MIN ? (
                <>
                  <sub className='text-sm'>min</sub>
                </>
              ) : pgovern === P.P_ACT ? (
                <>
                  <sub className='text-sm'>act</sub>
                </>
              ) : (
                <>
                  <sub className='text-sm'>max</sub>
                </>
              )}{' '}
              / ((π * ⌀<sup className='text-sm'>2</sup>)/4)
            </p>
            <p>n = {barsCount.toFixed(4)}</p>
            <p>
              ∴ Use {finalCount} pcs of {barDia} mm ⌀ steel bars
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignResults;
