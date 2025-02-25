'use client';

const About = () => {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 space-y-6'>
        <h2 className='text-2xl font-bold text-gray-900'>About</h2>
        <p className='text-gray-600'>
          This Singly Reinforced Concrete Beam Calculator was developed by a
          team of civil engineers to provide a reliable tool for structural
          analysis. The calculator follows the latest design codes and standards
          for reinforced concrete design, making it suitable for educational
          purposes.
        </p>

        <div className='space-y-4'>
          <section>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Developer
            </h3>
            <p className='text-gray-600'>Eduart&ecirc;, C.</p>
          </section>

          <section>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Writers
            </h3>
            <p className='text-gray-600'>Ayon, J.</p>
            <p className='text-gray-600'>Campo, P.</p>
            <p className='text-gray-600'>Eduart&ecirc;, C.</p>
            <p className='text-gray-600'>Gallinera, E.</p>
            <p className='text-gray-600'>Punzalan, MG.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
