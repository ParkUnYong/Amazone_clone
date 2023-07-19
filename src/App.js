import './App.css';
import React from 'react'
import Header from './component/Header';
import Home from './pages/Home';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { useEffect } from 'react';
import { auth } from './utils/firebase';
import { useStateValue } from './component/StateProvider';
import Payment from './pages/Payment';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './pages/Orders';

const promise = loadStripe(
  "pk_test_51M2w7qFvyMuA5Qv66ToKvuGsc0OaD4gXtf4e7vNRuckTUQbjz7XNKxEqKL0sSu31QzqFRVutTDxpRlWeYc442lZv00kA6IFSI8"
)


function App() {
  const [{},dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser,"응애");
      if(authUser){
        dispatch({
          type:'SET_USER',
          user : authUser
        })

      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])



  return (
    <Router>
        <div className="App">
          <Switch>
              <Route exact path="/login">
                <Login/>
              </Route>

              <Route exact path="/orders">
                <Header/>
                <Orders/>
              </Route>

              <Route exact path="/">
                <Header/>
                <Home/>
              </Route>

              <Route path ="/checkout">
                  <Header/>
                  <Checkout/>
              </Route> 

              <Route path="/payment">
                  <Header/>
                  <Elements stripe={promise}>
                    <Payment/>
                  </Elements>
              </Route>
          </Switch>  
        </div>
    </Router>
  );
}

export default App;
