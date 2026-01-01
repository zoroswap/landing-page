import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Footer from './components/Footer';
import Header from './components/Header';
import Social from './components/Social';
import Spacer from './components/Spacer';
import MediaKit from './pages/MediaKit';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './providers/ThemeProvider';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/media-kit' element={<MediaKit />} />
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
