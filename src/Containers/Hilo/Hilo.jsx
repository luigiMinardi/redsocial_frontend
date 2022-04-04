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
    const [datosHilo, setDatosHilo] = useState({});

    useEffect(() => {
        muestraHilo();
    }, []);

    const muestraHilo = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let res = await axios.get(`${baseURL}/hilos/${props.datosHilo._id}`, config);
            setDatosHilo(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const gustaDelHilo = async (hiloId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${props.credenciales.token}` }
            };

            const respuesta = await axios.post(`${baseURL}/usuarios/${props.credenciales.usuario._id}/like/${hiloId}`, null, config);

            if (respuesta.status === 200) {
                muestraHilo();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dejarDeGustarDelHilo = async (hiloId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${props.credenciales.token}` }
            };

            const respuesta = await axios.delete(`${baseURL}/usuarios/${props.credenciales.usuario._id}/like/${hiloId}`, null, config);

            if (respuesta.status === 200) {
                muestraHilo();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (Object.entries(datosHilo).length !== 0) {
        return (
            <div className='paginaHilo'>
                <Header />
                <div className="contenidoHilo">
                    <Margin />
                    <div className='cuerpoHilo'>
                        <div className="foroPostHilo">
                            <div className="postCabezaHilo"></div>
                            <div className='contenidoPostHilo'>
                                <p className='tituloHiloHome'>{datosHilo.titulo}</p>
                                <p className='cuerpoHiloHome'>{datosHilo.cuerpo}</p>
                                <div className="botonesPostHilo">

                                    {datosHilo?.usuario.usuarioId === props.credenciales.usuario._id
                                        && <div className="botonHilo" onClick={() => navigate('/editar-hilo')}>
                                            Modificar Hilo
                                        </div>
                                    }
                                    <div>Likes: {datosHilo.likes.length}</div>
                                    {datosHilo.likes.find(like => like === props.credenciales.usuario._id)
                                        ? <div className='botonHilo' onClick={() => {
                                            dejarDeGustarDelHilo(datosHilo._id);
                                        }}>Dejar de Gustar</div>
                                        : props.credenciales.token && <div className='botonHilo' onClick={() => {
                                            gustaDelHilo(datosHilo._id);
                                        }}>Gustar</div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className='paginaHilo'>
                <Header />
                <div className="contenidoHilo">
                    <Margin />
                    <div className='cuerpoHilo'>
                        <div className="foroPostHilo">
                            <div className="postCabezaHilo"></div>
                            <div className='contenidoPostHilo'>
                                <p className='tituloHiloHome'>404 hilo no encontrado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default connect((state) => ({
    credenciales: state.credenciales,
    datosHilo: state.datosHilo
}))(Hilo);