import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Registrar from './Containers/Registrar/Registrar';
import Login from './Containers/Login/Login';
import Nosotros from './Containers/Nosotros/Nosotros';
import EditarPerfil from './Containers/EditarPerfil/EditarPerfil';
import Perfil from './Containers/Perfil/Perfil';
import Publicaciones from './Containers/Publicaciones/Publicaciones';
import Usuarios from './Containers/Usuarios/Usuarios';
import Siguiendo from './Containers/Siguiendo/Siguiendo';
import Seguidores from './Containers/Seguidores/Seguidores';
import NuevoPost from './Containers/NuevoPost/NuevoPost';
import Hilo from './Containers/Hilo/Hilo';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/registrar" element={<Registrar/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/publicaciones" element={<Publicaciones/>} />
          <Route path="/usuarios" element={<Usuarios/>} />
          <Route path="/siguiendo" element={<Siguiendo/>} />
          <Route path="/seguidores" element={<Seguidores/>} />
          <Route path="/nuevopost" element={<NuevoPost/>} />
          <Route path="/hilo" element={<Hilo/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;