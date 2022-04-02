import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Seguidores.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';




const Seguidores = (props) => {
    const [seguidores, setSeguidores] = useState([]);
    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credenciales.token}` }
    };

    useEffect(() => {
        traerSeguidores();
    }, []);

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate("/");
        }
    })

    useEffect(() => {
        console.log(seguidores);
    }, [seguidores]);

    const traerSeguidores = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.credenciales.usuario._id}/seguidores`, config);
            console.log(respuesta.data)
            setTimeout(() => {
                setSeguidores(respuesta.data.seguidores);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    if (seguidores[0]?._id !== undefined) {
        return (
            <div className='paginaSeguidores'>
                <Header />
                <div className="contenidoSeguidores">
                    <Margin />
                    <div className='cuerpoSeguidores'>
                        <div className="foroPostSeguidores">
                            {
                                seguidores.map((usuario, index) => {
                                    return (
                                        <div className="postSeguidores" key={index}>
                                            <div className="cardSeguidores">
                                                <div className='cardSeguidoresIzq'>
                                                    <img className='imagenSeguidores' src={
                                                        usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : usuario.foto
                                                    } />
                                                    <button className='botonPerfil'>Ver Perfil</button>
                                                </div>
                                                <div className="cardSeguidoresDrc">
                                                    <p className='letras1'>Nombre: {usuario.nombre}</p>
                                                    <p className='letras1'>Apellidos: {usuario?.apellidos}</p>
                                                    <p className='letras1'>Ciudad: {usuario?.ciudad}</p>
                                                    <p className='letras1'>Fecha Seguidor: {usuario?.fecha}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='paginaSeguidores'>
                <Header />
                <div className="contenidoSeguidores">
                    <Margin />
                    <div className='cuerpoSeguidores'>
                        <div className="foroPostSeguidores">
                            <div className='espinner'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default connect((state) => ({
    credenciales: state.credenciales
}))(Seguidores);