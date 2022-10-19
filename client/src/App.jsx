import './App.css';
import { useState } from 'react';

import TitlePage from "./components/TitlePage";
import MainPage from "./components/MainPage";

function App() {

  const [mainPageActive, setMainPageActive] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
          <div className="app-container">
            <TitlePage active={!mainPageActive} setMainPageActive={setMainPageActive}/>
            <MainPage active={mainPageActive} />
          </div>
      </header>
    </div>
  );
}

export default App;
