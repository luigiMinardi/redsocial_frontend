// import React, {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { connect } from 'react-redux';

import './Seguidores.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Seguidores = () => {
        return (
            <div className='paginaSeguidores'> 
                <Header/>
                <div className="contenidoSeguidores">
                    <Margin/>
                        <div className='cuerpoSeguidores'>
                            <img className='foroImg'/>
                            <div className="foroPostSeguidores">
                                <div className="postCabezaSeguidores">
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



export default Seguidores;
// export default connect()(Seguidores);