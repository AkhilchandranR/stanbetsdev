import './App.css';
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/SignUp/SignUp';
import HomePage from './pages/HomePage/HomePage';
import WithdrawalPage from './pages/WithdrawalPage/WithdrawalPage';
import RestrictedScreen from './pages/RestrictedScreen/RestrictedScreen';
import { useEffect,useState } from 'react';
import axios from 'axios';

function App() {
  const [userFromRestrictedLocation,setUserFromRestrictedLocation] = useState(false);
  const [country,setCountry] = useState('');

  useEffect(() => {

    const checkCountry = async()=>{
      const blacklist = ["Brazil"];
      const API_KEY = "noy8k819phh5xunl ";
        const userCountry = await axios.get(`https://api.ipregistry.co/?key=${API_KEY}`)
        .then((response)=>response.data.location)
        .then((data)=>data.country.name)
        .catch((error)=>(error))
        if (blacklist.includes(userCountry)) {
          setCountry(userCountry);
          setUserFromRestrictedLocation(true);
        }
        else{
          setUserFromRestrictedLocation(false);
        }
    }
    checkCountry();
  }, [])


  return (
    <div className="App">
      {userFromRestrictedLocation ? (
        <RestrictedScreen country={country}/>
      ):(
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
      )}
    </div>
  );
}

export default App;
