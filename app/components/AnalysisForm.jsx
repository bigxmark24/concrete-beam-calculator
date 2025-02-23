const AnalysisForm = ({ dimensions, handleInputChange }) => {
  return (
    <div className='space-y-4'>
      <div>
        <label
          htmlFor='b'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Width (b) in mm:
        </label>
        <input
          id='b'
          name='b'
          value={dimensions.b}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label
          htmlFor='d'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Effective Depth (d) in mm:
        </label>
        <input
          id='d'
          name='d'
          value={dimensions.d}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label
          htmlFor='steel'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Steel in quantity-diameter(mm). (ex: 4-28):
        </label>
        <input
          id='steel'
          name='steel'
          value={dimensions.steel}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label
          htmlFor='fc'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Concrete Compressive Strength (f<sub className='text-sm'>c</sub>') in
          MPa:
        </label>
        <input
          id='fc'
          name='fc'
          value={dimensions.fc}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label
          htmlFor='fy'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Steel Yield Strength (f<sub className='text-sm'>y</sub>) in MPa:
        </label>
        <input
          id='fy'
          name='fy'
          value={dimensions.fy}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
    </div>
  )
}

export default AnalysisForm
