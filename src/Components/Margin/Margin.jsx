import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Margin.css';
// Redux
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/actions';


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
                <a className='boton' onClick={() => navigate('/')}>Foro</a>
                <a className='boton' onClick={() => navigate('/registrar')}>Registrarse</a>
                <a className='boton' onClick={() => navigate('/login')}>Login</a>
                <a className='boton' onClick={() => navigate('/nosotros')}>Sobre Nosotros</a>
                <a className='boton' onClick={() => logOut()}>Cerrar Session</a>
            </div>
        )
    } else {
        return (
            <div className='designMargin'>
                <a className='boton' onClick={() => navigate('/')}>Foro</a>
                <a className='boton' onClick={() => navigate('/publicaciones')}>Mis Publicaciones</a>
                <a className='boton' onClick={() => navigate('/usuarios')}>Amigos</a>
                <a className='boton' onClick={() => navigate('/perfil')}>Mi Perfil</a>
                <a className='boton' onClick={() => logOut()}>Cerrar Session</a>
            </div>
        )
    }
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Margin);