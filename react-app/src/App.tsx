import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Link to={'/formone'}>UncontrolledForm</Link>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Outlet />
    </>
  );
}

export default App;
