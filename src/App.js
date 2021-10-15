import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
