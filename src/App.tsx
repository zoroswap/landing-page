import './App.css';
import Landing from '../pages/Landing';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <Landing />
    </ThemeProvider>
  );
}

export default App;
