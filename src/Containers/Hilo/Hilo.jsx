import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './Hilo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';

const Hilo = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        // Compruebo si hay datos de la publicacion escogida en redux, en caso de NO
        // haber datos, redirijo a HOME.
        if (props.datosHilo?.publicacion === undefined) {
            navigate("/hilo");
        }
    },[]);
    return (
        <div className='paginaHilo'>
            <Header />
            <div className="contenidoHilo">
                <Margin />
                <div className='cuerpoHilo'>
                    <div className="foroPostHilo">
                        <div className="postCabezaHilo"></div>
                        <div className='contenidoPostHilo'>
                            <p className='tituloHiloHome'>{props.datosHilo.titulo}</p>
                            <p className='cuerpoHiloHome'>{props.datosHilo.cuerpo}</p>
                            <div className="botonHilo">
                                Modificar Hilo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default connect((state) => ({
    credenciales: state.credenciales,
    datosHilo: state.datosHilo.publicacion
}))(Hilo);