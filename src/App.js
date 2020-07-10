import React from 'react';
import { Route } from 'react-router-dom';
import SplashPage from './components/SplashPage'
import BabyNameForm from './components/BabyNameForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route exact path="/lists/:list_id" component={BabyNameForm}/>
        <ToastContainer />
      </div>
  );
}

export default App;
