import React from 'react';
import Setup from './components/Setup'
import BrewTimer from './components/BrewTimer'

import { BrewProvider } from './context/GlobalState'
import { TempProvider } from './context/TempState'


function App() {
  return (
    <BrewProvider>
      <TempProvider>
        <div className="main">
          <div className="main-container">
            <div className="app-header">
              <h1 className="app-header-title">Brew Tracker</h1>
            </div>
            <div className="flex-container">
              <BrewTimer />
              <Setup />
            </div>
          </div>
        </div>
      </TempProvider>
    </BrewProvider>
  );
}

export default App;
