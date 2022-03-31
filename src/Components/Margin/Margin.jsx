import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './Margin.css';

const Margin = (props) => {
    console.log("estamos como admin")
    const navigate = useNavigate()
    return (
        <div className='designMargin'>
            <a className='boton' onClick={() => navigate('/')}>Home</a>
            <a className='boton' onClick={() => navigate('/registrar')}>Registrarse</a>
            <a className='boton' onClick={() => navigate('/login')}>Login</a>
            <a className='boton' onClick={() => navigate('/nosotros')}>Sobre Nosotros</a>
            <a className='boton' >Cerrar Session</a>
        </div>
    )

}


export default Margin;