import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import Social from '../src/components/Social';
import Spacer from '../src/components/Spacer';
import Summary from '../src/components/Summary';

const Landing = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Spacer />
      <Summary />
      <Spacer />
      <Social />
      <Footer />
    </main>
  );
};

export default Landing;
