'use client';

import { useState } from 'react';
import {
  AnalysisForm,
  BeamDiagram,
  AnalysisCalculation,
  DesignForm,
  AnalysisResults,
  About,
  DesignCalculation,
  DesignResults,
} from './components';
import Image from 'next/image';

const SinglyBeamCalculator = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [analysis, setAnalysis] = useState({
    b: 300,
    d: 500,
    steel: '4-28',
    fc: 27,
    fy: 400,
  });
  const [design, setDesign] = useState({
    b: 300,
    d: 500,
    load: 20,
    barDia: 10,
    fc: 27,
    fy: 400,
  });
  const [analysisValid, setAnalysisValid] = useState(false);
  const [designValid, setDesignValid] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({});
  const [designResults, setDesignResults] = useState({});

  const handleAnalysisChange = (e) => {
    const { name, value } = e.target;
    if (name === 'steel') {
      setAnalysis((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAnalysis((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleDesignChange = (e) => {
    const { name, value } = e.target;
    if (name === 'barDia') {
      setDesign((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
      return;
    }

    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setDesign((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-2xl font-bold mb-6 flex items-center'>
          <Image src='/concrete.png' alt='Concrete' width={40} height={40} />
          <span className='ml-2'>
            Singly Reinforced Concrete Beam Calculator
          </span>
        </h1>

        <div className='flex justify-center mb-6'>
          <div className='border-b border-gray-200 w-full'>
            <div className='flex justify-center sm:space-x-8'>
              <button
                className={`px-4 sm:px-6 py-2 font-medium transition-colors duration-200 ${
                  activeTab === 'analysis'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                Analysis
              </button>
              <button
                className={`px-4 sm:px-6 py-2 font-medium transition-colors duration-200 ${
                  activeTab === 'design'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('design')}
              >
                Design
              </button>
              <button
                className={`px-4 sm:px-6 py-2 font-medium transition-colors duration-200 ${
                  activeTab === 'about'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='sticky top-0 md:static bg-white z-20'>
            <BeamDiagram
              dimensions={activeTab === 'analysis' ? analysis : design}
            />
          </div>

          <div className='md:max-h-[415px] lg:max-h-[495px] md:overflow-y-auto'>
            {activeTab === 'analysis' ? (
              <>
                <AnalysisForm
                  dimensions={analysis}
                  handleInputChange={handleAnalysisChange}
                  onValidation={setAnalysisValid}
                />
                <AnalysisCalculation
                  given={analysis}
                  setResults={setAnalysisResults}
                  isFormValid={analysisValid}
                  setDimensions={setAnalysis}
                />
                {Object.keys(analysisResults).length > 0 && (
                  <AnalysisResults results={analysisResults} />
                )}
              </>
            ) : activeTab === 'design' ? (
              <>
                <DesignForm
                  dimensions={design}
                  handleInputChange={handleDesignChange}
                  onValidation={setDesignValid}
                />
                <DesignCalculation
                  given={design}
                  setResult={setDesignResults}
                  isFormValid={designValid}
                  setDimensions={setDesign}
                />
                {Object.keys(designResults).length > 0 && (
                  <DesignResults results={designResults} />
                )}
              </>
            ) : (
              <About />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglyBeamCalculator;
