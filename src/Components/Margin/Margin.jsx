import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
// import 'antd/dist/antd.css';
// import {Input,Button} from 'antd';
import './Margin.css';

const Margin = (props) => {
    console.log("estamos como admin")
    const navigate = useNavigate()
    return (
        <div className='designMargin'>
            <a onClick={() => navigate('/')}>Home</a>
            <a onClick={() => navigate('/registrar')}>Registrar</a>
            <a onClick={() => navigate('/login')}>Usuario/Iniciar Session</a>
            <a onClick={() => navigate('/sobre-nosotros')}>Sobre Nosotros</a>
            <a>Cerrar Session</a>
        </div>
    )

}


export default Margin;