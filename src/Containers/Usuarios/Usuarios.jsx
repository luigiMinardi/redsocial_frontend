import './Usuarios.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const Usuarios = () => {
    return (
        <div className='paginaUsuarios'> 
            <Header/>
            <div className="contenidoUsuarios">
                <Margin/>
                    <div className='cuerpoUsuarios'>
                        <img className='foroImg'/>
                        <div className="foroPostUsuarios">
                            <div className="postCabezaUsuarios">
                                <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                                <div className="fechaPost"><p>Fecha de Post</p></div>
                            </div>
                            <h1>PAGINA DEL USUARIOS</h1>
                        </div>
                    </div>
            </div>
        </div>
    )
    
}


export default Usuarios;