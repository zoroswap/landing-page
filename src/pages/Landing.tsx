import Hero from '../components/Hero';
import Quote from '../components/Quote';
import Spacer from '../components/Spacer';
import Summary from '../components/Summary';

const Landing = () => {
  return (
    <main className='w-screen overflow-hidden'>
      <Hero />
      <Spacer />
      <Summary />
      <Quote />
    </main>
  );
};

export default Landing;
