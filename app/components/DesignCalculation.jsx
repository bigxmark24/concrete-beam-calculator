import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { B1_STATUS, P, STEEL_STATUS, STRAIN_STATUS } from '../constants';

const DesignCalculation = ({ given, setResult, isFormValid }) => {
  const [loading, setLoading] = useState(null);

  const { b, d, load, fc, fy, barDia } = given;
  const Rn = (load * 1e6) / (0.9 * b * Math.pow(d, 2));

  const b1Status =
    fc <= 28 && fc >= 17
      ? B1_STATUS.NORMAL_STRENGTH
      : fc > 28 && fc < 55
      ? B1_STATUS.HIGH_STRENGTH
      : B1_STATUS.HIGHEST_STRENGTH;
  const b1 =
    b1Status === B1_STATUS.NORMAL_STRENGTH
      ? 0.85
      : b1Status === B1_STATUS.HIGH_STRENGTH
      ? 0.85 - (0.05 * (fc - 28)) / 7
      : 0.65;

  const handleCalculate = async () => {
    setLoading(true);

    const pmin1 = 0.25 * (Math.sqrt(fc) / fy);
    const pmin2 = 1.4 / fy;
    const pmin = Math.max(pmin1, pmin2);

    const pmax = (3 / 7) * ((0.85 * fc * b1) / fy);

    const pact =
      ((0.85 * fc) / fy) * (1 - Math.sqrt(1 - (2 * Rn) / (0.85 * fc)));

    const p = pmin >= pact ? pmin : pact <= pmax && pmin < pact ? pact : pmax;
    const pgovern = p === pmin ? P.P_MIN : p === pmax ? P.P_MAX : P.P_ACT;

    const As = p * b * d;
    const a = (As * fy) / (0.85 * fc * b);
    const c = a / b1;

    const fs = (600 * (d - c)) / c;
    const steelStatus = fs < fy ? STEEL_STATUS.SDNY : STEEL_STATUS.SY;
    if (steelStatus === STEEL_STATUS.SDNY) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResult({
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
      });
      setLoading(false);
      return;
    }

    const esmax = 0.005;
    const esmin = fy / 200_000;
    const es = (0.003 * (d - c)) / c;
    const strainStatus =
      es >= esmax
        ? STRAIN_STATUS.TENSION_CONTROLLED
        : es < esmax && es >= esmin
        ? STRAIN_STATUS.TRANSITION_ZONE
        : STRAIN_STATUS.COMPRESSION_CONTROLLED;
    const phimax = 0.9;
    const phimin = 0.65;
    const phi =
      strainStatus === STRAIN_STATUS.TENSION_CONTROLLED
        ? phimax
        : strainStatus === STRAIN_STATUS.TRANSITION_ZONE
        ? phimin + (es - 0.002) * (250 / 3)
        : phimin;

    const barsCount = As / ((Math.PI * Math.pow(barDia, 2)) / 4);
    const finalCount = Math.ceil(barsCount);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResult({
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
      esmax,
      esmin,
      es,
      strainStatus,
      phimax,
      phimin,
      phi,
      barDia,
      barsCount,
      finalCount,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && loading === false) {
      const resultsElement = document.getElementById('#');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [loading]);

  return (
    <div className='mt-6' id='#'>
      <button
        onClick={handleCalculate}
        disabled={loading || !isFormValid}
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center'
      >
        {loading ? (
          <>
            <Loader2 className='animate-spin mr-2 h-5 w-5' />
            Calculating...
          </>
        ) : (
          'Calculate'
        )}
      </button>
    </div>
  );
};

export default DesignCalculation;
