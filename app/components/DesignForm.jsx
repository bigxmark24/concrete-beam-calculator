const DesignForm = ({ dimensions, handleInputChange }) => {
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
          type='number'
          value={dimensions.b}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          min='0'
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
          type='number'
          value={dimensions.d}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          min='0'
        />
      </div>

      <div>
        <label
          htmlFor='moment'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Moment (M) in kN-m:
        </label>
        <input
          id='moment'
          name='moment'
          type='number'
          value={dimensions.moment}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          min='0'
        />
      </div>
    </div>
  );
};

export default DesignForm;
