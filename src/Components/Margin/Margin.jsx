import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Margin.css';
// Redux
import { connect } from 'react-redux';
import { DATOS_PERFIL, LOGOUT } from '../../redux/actions';


const Margin = (props) => {

    const navigate = useNavigate()
    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({ type: LOGOUT });
        navigate("/");
    }

    if (props.credenciales.token === '') {
        return (
            <div className='designMargin'>
                <div className='margin'>
                    <div className='boton' onClick={() => navigate('/')}>Foro</div>
                    <div className='boton' onClick={() => navigate('/registrar')}>Registrarse</div>
                    <div className='boton' onClick={() => navigate('/login')}>Login</div>
                    <div className='boton' onClick={() => navigate('/nosotros')}>Sobre Nosotros</div>
                    <div className='boton' onClick={() => logOut()}>Cerrar Session</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='designMargin'>
                <div className='margin'>
                    <div className='boton' onClick={() => navigate('/')}>Foro</div>
                    <div className='boton' onClick={async () => {
                        await props.dispatch({ type: DATOS_PERFIL, payload: props.credenciales.usuario._id })
                        navigate('/publicaciones')
                    }}
                    >Mis Publicaciones</div>
                    <div className='boton' onClick={() => navigate('/siguiendo')}>Amigos</div>
                    <div className='boton' onClick={async () => {
                        await props.dispatch({ type: DATOS_PERFIL, payload: props.credenciales.usuario._id })
                        navigate('/perfil')
                    }}
                    >Mi Perfil</div>
                    <div className='boton' onClick={() => logOut()}>Cerrar Session</div>
                </div>
            </div >
        )
    }
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Margin);