import './App.css';
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/SignUp/SignUp';
import HomePage from './pages/HomePage/HomePage';
import WithdrawalPage from './pages/WithdrawalPage/WithdrawalPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/withdrawal">
            <WithdrawalPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
