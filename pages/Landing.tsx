import Hero from '../src/components/Hero';
import Spacer from '../src/components/Spacer';
import Summary from '../src/components/Summary';

const Landing = () => {
  return (
    <main className='w-screen overflow-hidden'>
      <Hero />
      <Spacer />
      <Summary />
    </main>
  );
};

export default Landing;
