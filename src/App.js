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
import EditarHilo from './Containers/EditarHilo/EditarHilo';
import Likes from './Containers/Likes/Likes';
import EditarContrasena from './Containers/EditarContrasena/EditarContrasena';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hilo" element={<Hilo />} />
          <Route path="/nuevo-post" element={<NuevoPost />} />
          <Route path="/editar-hilo" element={<EditarHilo />} />

          <Route path="/registrar" element={<Registrar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} /> {/*// TODO: Hacer que esa pagina tenga algo */}

          <Route path="/seguidores" element={<Seguidores />} />
          <Route path="/siguiendo" element={<Siguiendo />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/likes" element={<Likes />} />

          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/editar-contrasena" element={<EditarContrasena />} />

          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;