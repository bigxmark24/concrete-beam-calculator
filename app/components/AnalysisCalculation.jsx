import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { B1_STATUS, P, STEEL_STATUS, STRAIN_STATUS } from '../constants';

const AnalysisCalculation = ({
  given,
  setResults,
  isFormValid,
  setDimensions,
}) => {
  const [loading, setLoading] = useState(null);

  const { b, d, steel, fc, fy } = given;
  const As =
    (Math.PI / 4) *
    Math.pow(steel.split('-')[1], 2) *
    parseInt(steel.split('-')[0]);
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

    const pact = As / (b * d);

    const pmax = (3 / 7) * ((0.85 * fc * b1) / fy);

    const p = pmin >= pact ? pmin : pact <= pmax && pmin < pact ? pact : pmax;
    const pgovern = p === pmin ? P.P_MIN : p === pmax ? P.P_MAX : P.P_ACT;

    const AsUsed = pgovern === P.P_ACT ? As : p * b * d;
    const a = (AsUsed * fy) / (0.85 * fc * b);
    const c = a / b1;

    const fs = (600 * (d - c)) / c;
    const steelStatus = fs < fy ? STEEL_STATUS.SDNY : STEEL_STATUS.SY;
    if (steelStatus === STEEL_STATUS.SDNY) {
      const newC =
        (Math.sqrt(600 * AsUsed * (600 * AsUsed + 3.4 * fc * b1 * b * d)) -
          600 * AsUsed) /
        (1.7 * fc * b1 * b);
      const newA = c * b1;
      const fsNew = (600 * (d - newC)) / newC;

      const esmax = 0.005;
      const esmin = fsNew / 200_000;
      const es = (0.003 * (d - newC)) / newC;
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

      const nominalMoment = (AsUsed * fsNew * (d - newA / 2)) / 1e6;
      const ultimateMoment = (phi * nominalMoment).toFixed(4);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResults({
        fc,
        b1Status,
        b1,
        pmin1,
        pmin2,
        pmin,
        pact,
        pmax,
        p,
        pgovern,
        AsUsed,
        a,
        c,
        fs,
        steelStatus,
        newC,
        newA,
        fsNew,
        esmax,
        esmin,
        es,
        strainStatus,
        phi,
        phimax,
        phimin,
        nominalMoment,
        ultimateMoment,
      });
      setDimensions((prev) => ({ ...prev, load: ultimateMoment }));
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

    const nominalMoment = (AsUsed * fy * (d - a / 2)) / 1e6;
    const ultimateMoment = (phi * nominalMoment).toFixed(4);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResults({
      fc,
      b1Status,
      b1,
      pmin1,
      pmin2,
      pmin,
      pact,
      pmax,
      p,
      pgovern,
      AsUsed,
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
    });
    setDimensions((prev) => ({ ...prev, load: ultimateMoment }));
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

export default AnalysisCalculation;
