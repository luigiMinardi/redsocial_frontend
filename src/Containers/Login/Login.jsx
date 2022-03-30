// import React, {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { connect } from 'react-redux';

import './Login.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Login = () => {

    return (
        <div className='paginaLogin'>
            <Header />
            <div className="contenidoLogin">
                <Margin />
                <div className='cuerpo'>
                    <div className='login'>
                    <div className="postCabeza2">
                    <p className='letras'>Introduce tus datos.</p>
                    </div>
                    <input className='input2' type="text" name="correo" id="correo" title="correo" placeholder="Correo Electronico" autoComplete="off" />
                    <input className='input2' type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" />
                    <div className="botonLogin">Login!</div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default Login;