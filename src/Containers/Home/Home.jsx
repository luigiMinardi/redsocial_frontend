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
                        <div className="foroPostHome">
                            <div className="postCabezaHome">
                                <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                                <div className="fechaPost"><p>Fecha de Post</p></div>
                            </div>
                            {
                                hilos.map((hilo, index) => {
                                    return (
                                        <div className="postHome" key={index}>
                                            <p>{hilo.titulo}</p>
                                            <p>{hilo.cuerpo}</p>
                                            <p>{hilo.fecha}</p>
                                            <p>{hilo.usuario.nombre}</p>
                                            <p>{hilo.usuario.apellidos}</p>
                                            <img className='imagenUsuario' src={
                                                hilo.usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : hilo.usuario.foto
                                            } />
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
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
                        {/* <div className="foroPostHome"> */}
                            <div className="espinner"></div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    };
}




export default Home;
