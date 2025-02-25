import { useEffect, useState } from 'react';

const DesignForm = ({ dimensions, handleInputChange, onValidation }) => {
  const [errors, setErrors] = useState({
    b: '',
    d: '',
    load: '',
    barDia: '',
    fc: '',
    fy: '',
  });

  const validateInput = (name, value) => {
    switch (name) {
      case 'b':
        if (value < 150 || !value) return 'Minimum width (b) is 150mm';
        if (value > 1000) return 'Maximum width (b) is 1000mm';
        return '';
      case 'd':
        if (value < 125 || !value)
          return 'Minimum effective depth (d) is 125mm';
        if (value > 1500) return 'Maximum effective depth (d) is 1500mm';
        return '';
      case 'load':
        if (value < 0) return 'Minimum load is 0 kN-m';
        return '';
      case 'barDia':
        if (value < 10 || !value) return 'Minimum diameter is 10mm';
        if (value > 40) return 'Maximum diameter is 40mm';
        return '';
      case 'fc':
        if (value < 17 || !value) return "Minimum f\u2083' is 17 MPa";
        if (value > 70) return "Maximum f\u2083' is 70 MPa";
        return '';
      case 'fy':
        if (value < 275 || !value) return 'Minimum f\u1D64 is 275 MPa';
        if (value > 550) return 'Maximum f\u1D64 is 550 MPa';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);

    const error = validateInput(name, parseFloat(value));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === '');
    onValidation?.(isValid);
  }, [errors]);

  useEffect(() => {
    setErrors({
      b: validateInput('b', dimensions.b),
      d: validateInput('d', dimensions.d),
      load: validateInput('load', dimensions.load),
      barDia: validateInput('barDia', dimensions.barDia),
      fc: validateInput('fc', dimensions.fc),
      fy: validateInput('fy', dimensions.fy),
    });
  }, []);

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
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.b
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.b && <p className='text-red-500 text-sm mt-1'>{errors.b}</p>}
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
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.d
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.d && <p className='text-red-500 text-sm mt-1'>{errors.d}</p>}
      </div>

      <div>
        <label
          htmlFor='load'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Ultimate Moment (M<sub className='text-sm'>u</sub>) in kN-m:
        </label>
        <input
          id='load'
          name='load'
          value={dimensions.load}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.load
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.load && (
          <p className='text-red-500 text-sm mt-1'>{errors.load}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='barDia'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Bar Diameter (⌀) in mm:
        </label>
        <input
          id='barDia'
          name='barDia'
          value={dimensions.barDia}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.barDia
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.barDia && (
          <p className='text-red-500 text-sm mt-1'>{errors.barDia}</p>
        )}
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
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.fc
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.fc && <p className='text-red-500 text-sm mt-1'>{errors.fc}</p>}
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
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.fy
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.fy && <p className='text-red-500 text-sm mt-1'>{errors.fy}</p>}
      </div>
    </div>
  );
};

export default DesignForm;
