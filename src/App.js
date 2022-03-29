import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Registrar from './Containers/Registrar/Registrar';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/registrar" element={<Registrar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;