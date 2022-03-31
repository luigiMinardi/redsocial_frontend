import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Margin.css';
// Redux
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';


const Margin = (props) => {

    const navigate = useNavigate()
    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({ type: LOGOUT });
        setTimeout(() => {
            navigate("/");
        }, 500);
    }

    if (props.credenciales.token === '') {
    return (
        <div className='designMargin'>
            <a className='boton' onClick={() => navigate('/')}>Home</a>
            <a className='boton' onClick={() => navigate('/registrar')}>Registrarse</a>
            <a className='boton' onClick={() => navigate('/login')}>Login</a>
            <a className='boton' onClick={() => navigate('/nosotros')}>Sobre Nosotros</a>
            <a className='boton' onClick={() => logOut()}>Cerrar Session</a>
        </div>
    )
    } else {
        return(
            <div className='designMargin'>
            <a className='boton' onClick={() => navigate('/')}>Home</a>
            <a className='boton' onClick={() => navigate('/publicaciones')}>Publicaciones</a>
            <a className='boton' onClick={() => navigate('/perfil')}>Perfil</a>
            <a className='boton' onClick={() => navigate('/nosotros')}>Sobre Nosotros</a>
            <a className='boton' onClick={() => logOut()}>Cerrar Session</a>
        </div>
        )
    }
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Margin);