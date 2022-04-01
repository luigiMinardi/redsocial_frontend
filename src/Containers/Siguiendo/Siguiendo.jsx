// import React, {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { connect } from 'react-redux';

import './Siguiendo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Siguiendo = () => {
        return (
            <div className='paginaSiguiendo'> 
                <Header/>
                <div className="contenidoSiguiendo">
                    <Margin/>
                        <div className='cuerpoSiguiendo'>
                            <img className='foroImg'/>
                            <div className="foroPostSiguiendo">
                                <div className="postCabezaSiguiendo">
                                    <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                                    <div className="fechaPost"><p>Fecha de Post</p></div>
                                </div>
                                <h1>PAGINA DEL FORO</h1>
                            </div>
                        </div>
                </div>
            </div>
        )
        
}



export default Siguiendo;
// export default connect()(Siguiendo);