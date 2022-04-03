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
                                {datosHilo?.usuario.usuarioId === props.credenciales.usuario._id
                                    && <div className="botonHilo" onClick={() => navigate('/editar-hilo')}>
                                        Modificar Hilo
                                    </div>
                                }
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