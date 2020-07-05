import React from 'react';
import { Route } from 'react-router-dom';
import SplashPage from './components/SplashPage'
import BabyNameForm from './components/BabyNameForm'

function App() {
  return (
      <div>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route exact path="/lists/:list_id">
          <BabyNameForm />
        </Route>
      </div>
  );
}

export default App;
