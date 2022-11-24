import React,{useState,useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate  
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const login=useCallback(()=>{
    setIsLoggedIn(true);
  },[]);
  const logout=useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        <Route path="/" exact element={<Users></Users>}></Route>
        <Route path="/:userId/places" exact element={<UserPlaces></UserPlaces>}></Route>
        <Route path="/places/new" exact element={<NewPlace></NewPlace>}></Route>
        <Route path="/places/:placeId" exact element={<UpdatePlace></UpdatePlace>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  else{
    routes=(
      <Routes>
      <Route path="/" exact element={<Users></Users>}></Route>
      <Route path="/:userId/places" exact element={<UserPlaces></UserPlaces>}></Route>
      <Route path='/auth' exact element={<Auth></Auth>}></Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>
    <Router>
      <MainNavigation />
      <main>
        {routes};
      </main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
