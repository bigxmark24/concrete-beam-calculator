'use client'

import { useState } from 'react'
import {
  AnalysisForm,
  BeamDiagram,
  CalculateAnalysis,
  DesignForm,
  AnalysisResults,
} from './components'
import Image from 'next/image'

const SinglyBeamCalculator = () => {
  const [activeTab, setActiveTab] = useState('analysis')
  const [analysis, setAnalysis] = useState({
    b: 300,
    d: 500,
    steel: '4-28',
    fc: 27,
    fy: 400,
  })
  const [design, setDesign] = useState({
    b: 500,
    d: 500,
    load: 0,
  })
  const [analysisResults, setAnalysisResults] = useState({})

  const handleAnalysisChange = (e) => {
    const { name, value } = e.target
    if (name === 'steel') {
      if (/^[0-9-]*$/.test(value)) {
        setAnalysis((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
      return
    }

    if (/^[0-9]*$/.test(value)) {
      setAnalysis((prev) => ({
        ...prev,
        [name]: parseFloat(value) || '',
      }))
    }
  }
  const handleDesignChange = (e) => {
    const { name, value } = e.target
    setDesign((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

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
            <div className='flex justify-center space-x-8'>
              <button
                className={`px-6 py-2 font-medium transition-colors duration-200 ${
                  activeTab === 'analysis'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                Analysis
              </button>
              <button
                className={`px-6 py-2 font-medium transition-colors duration-200 ${
                  activeTab === 'design'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('design')}
              >
                Design
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='sticky top-0 md:static bg-white'>
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
                />
                <CalculateAnalysis
                  given={analysis}
                  setResults={setAnalysisResults}
                />
                {Object.keys(analysisResults).length > 0 && (
                  <AnalysisResults results={analysisResults} />
                )}
              </>
            ) : (
              <DesignForm
                dimensions={design}
                handleInputChange={handleDesignChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglyBeamCalculator
