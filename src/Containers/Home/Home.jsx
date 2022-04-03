import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './Home.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';

const Home = () => {
    const [hilos, setHilos] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        traerHilos();
    }, []);

    useEffect(() => {
    }, [hilos]);

    const traerHilos = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/hilos`);
            console.log(respuesta.data)
            setTimeout(() => {
                setHilos(respuesta.data);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    if (hilos[0]?._id !== undefined) {
        return (
            <div className='paginaHome'>
                <Header />
                <div className="contenidoHome">
                    <Margin />
                    <div className='cuerpoHome'>
                            {
                                hilos.map((hilo, index) => {
                                    return (
                                        <div className="foroPostHome" key={index}>
                                            <div className="postCabezaHome">
                                                <div className="nombreUsuarioHome">
                                                    <img className='imagenUsuarioHome' src={
                                                        hilo.usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : hilo.usuario.foto
                                                    } />
                                                    <p>{hilo.usuario.nombre} {hilo.usuario.apellidos}</p>
                                                </div>
                                                <div className="fechaPost"><p>Fecha : {hilo.fecha}</p></div>
                                            </div>
                                            <div className='contenidoPostHome'>
                                                <p className='tituloHilo'>{hilo.titulo}</p>
                                                <p className='cuerpoHilo'>{hilo.cuerpo}</p>
                                            </div>
                                            <div className="botonesPostHome">
                                                <button className='botonHome'>Me gusta</button>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className='paginaHome'>
                <Header />
                <div className="contenidoHome">
                    <Margin />
                    <div className='cuerpoHome'>
                        <div className="espinner"></div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Home;
