import { P, STEEL_STATUS, STRAIN_STATUS } from '../constants'

const Results = ({ results }) => {
  const {
    pmin1,
    pmin2,
    pmin,
    pact,
    pmax,
    p,
    pgovern,
    a,
    c,
    fs,
    steelStatus,
    esmax,
    esmin,
    es,
    strainStatus,
    phi,
    phimax,
    phimin,
    nominalMoment,
    ultimateMoment,
  } = results

  return (
    <div className='mt-6 p-4 bg-gray-50 rounded-md'>
      <h3 className='text-lg font-bold mb-3'>Results:</h3>
      <div className='space-y-3'>
        <div>
          <p className='font-semibold'>Step #1: Steep Ratios</p>
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
                {pmin.toFixed(4).toFixed(4)}
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
                ∴ DRB, However, if the problems only provide steel at the
                tension side, use SRB analysis and use ρ
                <sub className='text-sm'>max</sub> = {pmax.toFixed(4)}
              </p>
            </>
          )}
        </div>

        <div>
          <p className='font-semibold'>Step #3: C = T (assume S.Y)</p>
          <p>0.85fc' * a * b = As * fy</p>
          <p>a = {a.toFixed(4)} mm</p>
          <p>c = {c.toFixed(4)} mm</p>
        </div>

        <div>
          <p className='font-semibold'>Step #4: Stress Check</p>
          <p>fs = {fs.toFixed(4)} MPa</p>
          {steelStatus === STEEL_STATUS.SY && (
            <>
              <p>fs {'>'} fy</p>
              <p>∴ Steel Yields!</p>
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
              <p>∴ Transition Zone, use Φ = {phi}</p>
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
            M<sub className='text-sm'>n</sub> = As * fy * (d - a/2)
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
  )
}

export default Results
