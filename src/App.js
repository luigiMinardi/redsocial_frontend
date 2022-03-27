import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Margin from './Components/Margin/Margin';
import Home from './Containers/Home/Home';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Margin/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;