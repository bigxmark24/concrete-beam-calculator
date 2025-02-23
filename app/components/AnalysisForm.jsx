import { useState, useEffect } from 'react'

const AnalysisForm = ({ dimensions, handleInputChange, onValidation }) => {
  const [errors, setErrors] = useState({
    b: '',
    d: '',
    steel: '',
    fc: '',
    fy: '',
  })

  const validateInput = (name, value) => {
    switch (name) {
      case 'b':
        if (value < 150 || !value) return 'Minimum width (b) is 150mm'
        if (value > 1000) return 'Maximum width (b) is 1000mm'
        return ''
      case 'd':
        if (value < 125 || !value) return 'Minimum effective depth (d) is 125mm'
        if (value > 1500) return 'Maximum effective depth (d) is 1500mm'
        return ''
      case 'steel':
        if (!/^\d+-\d+$/.test(value)) return 'Invalid format (e.g. 4-28)'
        const [qty, dia] = value.split('-')
        if (parseInt(qty) < 1 || !qty) return 'Minimum 1 steel bar'
        if (parseInt(dia) < 10 || !dia) return 'Minimum diameter is 10mm'
        if (parseInt(dia) > 40) return 'Maximum diameter is 40mm'
        return ''
      case 'fc':
        if (value < 17 || !value) return "Minimum f\u2083' is 17 MPa"
        if (value > 70) return "Maximum f\u2083' is 70 MPa"
        return ''
      case 'fy':
        if (value < 275 || !value) return 'Minimum f\u1D64 is 275 MPa'
        if (value > 550) return 'Maximum f\u1D64 is 550 MPa'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleInputChange(e)

    const error = validateInput(
      name,
      name === 'steel' ? value : parseFloat(value)
    )
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === '')
    onValidation?.(isValid)
  }, [errors])

  useEffect(() => {
    setErrors({
      b: validateInput('b', dimensions.b),
      d: validateInput('d', dimensions.d),
      steel: validateInput('steel', dimensions.steel),
      fc: validateInput('fc', dimensions.fc),
      fy: validateInput('fy', dimensions.fy),
    })
  }, [])

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
          htmlFor='steel'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Steel in quantity-diameter(mm). (ex: 4-28):
        </label>
        <input
          id='steel'
          name='steel'
          value={dimensions.steel}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.steel
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.steel && (
          <p className='text-red-500 text-sm mt-1'>{errors.steel}</p>
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
  )
}

export default AnalysisForm
