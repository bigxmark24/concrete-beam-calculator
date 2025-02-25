import { B1_STATUS, P, STEEL_STATUS, STRAIN_STATUS } from '../constants';

const AnalysisResults = ({ results }) => {
  const {
    fc,
    b1Status,
    b1,
    pmin1,
    pmin2,
    pmin,
    pact,
    pmax,
    pgovern,
    AsUsed,
    a,
    c,
    fs,
    steelStatus,
    newC = null,
    newA = null,
    fsNew = null,
    esmax,
    esmin,
    es,
    strainStatus,
    phi,
    phimax,
    phimin,
    nominalMoment,
    ultimateMoment,
  } = results;

  return (
    <div className='mt-6 p-4 bg-gray-50 rounded-md'>
      <h3 className='text-lg font-bold mb-3'>Results:</h3>
      <div className='space-y-3'>
        <div>
          <p className='font-semibold'>Step #1: Steep Ratios</p>
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
          <p className='font-semibold'>Step #2: SRB or DRB</p>
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
          <p className='font-semibold'>Step #3: C = T (assume S.Y)</p>
          {pgovern !== P.P_ACT && (
            <>
              <p>
                Since we used ρ
                {pgovern === P.P_MAX ? (
                  <sub className='text-sm'>max</sub>
                ) : (
                  <sub className='text-sm'>min</sub>
                )}
                , we need to recalculate As
                {pgovern === P.P_MAX ? (
                  <sub className='text-sm'>max</sub>
                ) : (
                  <sub className='text-sm'>min</sub>
                )}
              </p>
              <p>
                As
                {pgovern === P.P_MAX ? (
                  <sub className='text-sm'>max</sub>
                ) : (
                  <sub className='text-sm'>min</sub>
                )}{' '}
                = ρ
                {pgovern === P.P_MAX ? (
                  <sub className='text-sm'>max</sub>
                ) : (
                  <sub className='text-sm'>min</sub>
                )}{' '}
                * b * d
              </p>
              <p>
                As
                {pgovern === P.P_MAX ? (
                  <sub className='text-sm'>max</sub>
                ) : (
                  <sub className='text-sm'>min</sub>
                )}{' '}
                = {AsUsed.toFixed(4)} mm<sup className='text-sm'>2</sup>
              </p>
            </>
          )}
          <p>
            0.85fc' * a * b = As
            {pgovern !== P.P_ACT &&
              (pgovern === P.P_MAX ? (
                <sub className='text-sm'>max</sub>
              ) : (
                <sub className='text-sm'>min</sub>
              ))}{' '}
            * fy
          </p>
          <p>a = {a.toFixed(4)} mm</p>
          <p>c = {c.toFixed(4)} mm</p>
        </div>

        <div>
          <p className='font-semibold'>Step #4: Stress Check</p>
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
              <p>∴ Steel Did Not Yields :'{'<'}</p>
              <p>Recalculate with new c and a</p>
              <p>
                As
                {pgovern !== P.P_ACT &&
                  (pgovern === P.P_MAX ? (
                    <sub className='text-sm'>max</sub>
                  ) : (
                    <sub className='text-sm'>min</sub>
                  ))}{' '}
                * (600 * ((d - c) / c)) = 0.85 * f
                <sub className='text-sm'>c</sub>' * c * β
                <sub className='text-sm'>1</sub> * b
              </p>
              <p>c = {newC.toFixed(4)} mm</p>
              <p>a = {newA.toFixed(4)} mm</p>
              <p>
                f<sub className='text-sm'>s</sub> = {fsNew.toFixed(4)} MPa
              </p>
            </>
          )}
        </div>

        <div>
          <p className='font-semibold'>Step #5: Strain Check</p>
          <p>
            ε<sub className='text-sm'>s</sub> = {es.toFixed(4)}
          </p>
          {strainStatus === STRAIN_STATUS.TENSION_CONTROLLED && (
            <>
              <p>
                ε<sub className='text-sm'>s</sub> {'>'} {esmax}
              </p>
              <p>∴ Tension Controlled, use Φ = {phimax}</p>
            </>
          )}
          {strainStatus === STRAIN_STATUS.TRANSITION_ZONE && (
            <>
              <p>
                ε<sub className='text-sm'>s</sub> {'<'} {esmax.toFixed(4)} and ε
                <sub className='text-sm'>s</sub> ≥ ε
                <sub className='text-sm'>min</sub> = {esmin.toFixed(4)}
              </p>
              <p>∴ Transition Zone, use Φ = {phi.toFixed(4)}</p>
            </>
          )}
          {strainStatus === STRAIN_STATUS.COMPRESSION_CONTROLLED && (
            <>
              <p>
                ε<sub className='text-sm'>s</sub> {'<'} ε
                <sub className='text-sm'>min</sub> {esmin.toFixed(4)}
              </p>
              <p>∴ Compression Controlled, use Φ = {phimin}</p>
            </>
          )}
        </div>

        <div>
          <p className='font-semibold'>Step #6: Moment Capacity</p>
          <p>
            M<sub className='text-sm'>n</sub> = As
            {pgovern !== P.P_ACT &&
              (pgovern === P.P_MAX ? (
                <sub className='text-sm'>max</sub>
              ) : (
                <sub className='text-sm'>min</sub>
              ))}{' '}
            * fy * (d - a/2)
          </p>
          <p>
            M<sub className='text-sm'>n</sub> ={' '}
            {(nominalMoment / 1e6).toFixed(4)} kN-m
          </p>
          <p>
            M<sub className='text-sm'>u</sub> = Φ * M
            <sub className='text-sm'>n</sub>
          </p>
          <p>
            M<sub className='text-sm'>u</sub> ={' '}
            {(ultimateMoment / 1e6).toFixed(4)} kN-m
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
