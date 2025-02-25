const BeamDiagram = ({ dimensions }) => {
  return (
    <div className='w-full aspect-square md:aspect-auto'>
      <svg viewBox='0 0 400 500' className='w-full h-full'>
        <rect
          x='50'
          y='50'
          width='300'
          height='400'
          fill='white'
          stroke='#334155'
          strokeWidth='2'
        />

        <rect
          x='50'
          y='50'
          width='300'
          height='160'
          fill='#fecaca'
          stroke='#334155'
          strokeWidth='2'
        />

        <line
          x1='50'
          y1='475'
          x2='353'
          y2='475'
          stroke='#22c55e'
          strokeWidth='1'
          strokeDasharray='5,5'
        />
        <text x='200' y='495' textAnchor='middle'>
          b = {dimensions.b || '(?)'} mm
        </text>

        <line
          x1='375'
          y1='50'
          x2='375'
          y2='400'
          stroke='#22c55e'
          strokeWidth='1'
          strokeDasharray='5,5'
        />
        <line
          x1='200'
          y1='400'
          x2='380'
          y2='400'
          stroke='#22c55e'
          strokeWidth='1'
          strokeDasharray='5,5'
        />
        <text
          x='420'
          y='290'
          textAnchor='middle'
          transform='rotate(90, 420, 250)'
        >
          d = {dimensions.d || '(?)'} mm
        </text>

        <line
          x1='25'
          y1='50'
          x2='25'
          y2='210'
          stroke='#ef4444'
          strokeWidth='1'
          strokeDasharray='5,5'
        />
        <line
          x1='30'
          y1='210'
          x2='350'
          y2='210'
          stroke='#ef4444'
          strokeWidth='1'
          strokeDasharray='5,5'
        />
        <text
          x='15'
          y='135'
          textAnchor='middle'
          transform='rotate(90, 15, 130)'
        >
          a = (?) mm
        </text>

        <text x='200' y='40' textAnchor='middle'>
          fc' = {dimensions.fc || '(?)'} MPa, fy = {dimensions.fy || '(?)'} MPa
        </text>

        <text x='200' y='370' textAnchor='middle'>
          Steel = {dimensions.steel || '(?)'} mm dia.
        </text>
        <circle
          cx='200'
          cy='400'
          r='20'
          fill='#7dd3fc'
          stroke='#0369a1'
          strokeWidth='2'
        />
      </svg>
    </div>
  );
};

export default BeamDiagram;
