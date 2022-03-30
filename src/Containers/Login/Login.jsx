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
                    <div className='login'></div>

                </div>
            </div>
        </div>
    )

}



export default Login;