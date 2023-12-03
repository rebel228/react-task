import './App.css';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import UserCard from './components/UserCard/UserCard';

function App() {
  const forms = useAppSelector((state) => state.formsReducer);
  return (
    <>
      <header>
        <Link to={'/formone'}>Uncontrolled Form</Link>
        <Link to={'/formtwo'}>Controlled Form</Link>
      </header>
      <main>
        <div className="user-cards">
          {forms.map((form, index) => {
            return <UserCard key={index} form={form} />;
          })}
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default App;
