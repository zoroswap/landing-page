import Hero from '../components/Hero';
import Spacer from '../components/Spacer';
import Summary from '../components/Summary';

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
