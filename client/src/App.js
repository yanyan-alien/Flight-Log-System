import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/main.jsx'
import { AuthProvider } from './components/auth.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
