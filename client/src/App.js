import Main from './components/Main';
import './App.css';
import { UserContext } from './context/UserContext';

function App() {
  return (
    <>
      <UserContext>
        <Main />
      </UserContext>
    </>
  );
}

export default App;
