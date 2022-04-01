import './Publicaciones.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const Publicaciones = () => {
    return (
        <div className='paginaPublicaciones'> 
            <Header/>
            <div className="contenidoPublicaciones">
                <Margin/>
                    <div className='cuerpoPublicaciones'>
                        <img className='foroImg'/>
                        <div className="foroPostPublicaciones">
                            <div className="postCabezaPublicaciones">
                                <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                                <div className="fechaPost"><p>Fecha de Post</p></div>
                            </div>
                            <h1>PAGINA DEL PUBLICACIONES</h1>
                        </div>
                    </div>
            </div>
        </div>
    )
    
}






export default Publicaciones;