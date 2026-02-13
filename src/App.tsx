import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Social from './components/Social';
import Spacer from './components/Spacer';
import Developers from './pages/Developers';
import Landing from './pages/Landing';
import MediaKit from './pages/MediaKit';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './providers/ThemeProvider';

function ExternalRedirect({ to }: { to: string }) {
  window.location.replace(to);
  return null;
}

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/media-kit' element={<MediaKit />} />
      <Route path='/developer-integration' element={<Developers />} />
      <Route path='/faucet' element={<ExternalRedirect to='https://app.zoroswap.com/faucet' />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <Header />
      <AppRouter />
      <Spacer />
      <Social />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
