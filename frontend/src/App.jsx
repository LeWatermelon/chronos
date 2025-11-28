import AppRoutes from './Routes.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { SettingsProvider } from "./components/SettingsContext/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Router>
        <AppRoutes/>
      </Router>
    </SettingsProvider>
  );
}

export default App;