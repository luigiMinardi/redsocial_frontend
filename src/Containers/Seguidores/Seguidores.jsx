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
                                        <p className='letras1'>{usuario.nombre}</p>
                                        <p className='letras1'>{usuario?.apellidos}</p>
                                        <p className='letras1'>{usuario?.ciudad}</p>
                                        <p className='letras1'>{usuario?.fecha}</p>
                                        <img className='letras1' src={
                                            usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : usuario.foto
                                        } />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credenciales: state.credenciales
}))(Seguidores);