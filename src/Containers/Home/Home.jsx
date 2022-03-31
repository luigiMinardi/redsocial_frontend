// import React, {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { connect } from 'react-redux';

import './Home.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Home = () => {
        return (
            <div className='paginaHome'> 
                <Header/>
                <div className="contenidoHome">
                    <Margin/>
                        <div className='cuerpoHome'>
                            <img className='foroImg'/>
                            <div className="foroPostHome">
                                <div className="postCabezaHome">
                                    <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                                    <div className="fechaPost"><p>Fecha de Post</p></div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
        
}



export default Home;
// export default connect()(Home);