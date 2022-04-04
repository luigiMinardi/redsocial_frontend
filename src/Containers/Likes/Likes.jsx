import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Likes.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';
import { DATOS_HILO } from '../../redux/actions';

const Likes = (props) => {
    const [likes, setlikes] = useState([]);
    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credenciales.token}` }
    };

    useEffect(() => {
        traerlikes();
    }, []);

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate("/");
        }
    })

    useEffect(() => {
        console.log(likes);
    }, [likes]);

    const traerlikes = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.perfil._id}/likes`, config);
            console.log(respuesta.data.usuario.likes)
            setTimeout(() => {
                setlikes(respuesta.data.usuario.likes);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const escogeHilo = (hilo) => {
        console.log(hilo);
        props.dispatch({ type: DATOS_HILO, payload: hilo });
        // Redirigimos a la pagina hilo con navigate al Pulsar sobre un hilo en concreto.
        navigate("/hilo");
    };

    if (likes[0]?._id !== undefined) {
        return (
            <div className='paginaLikes'>
                <Header />
                <div className="contenidoLikes">
                    <Margin />
                    <div className='cuerpoLikes'>
                        <div className="foroPostLikes">
                            {
                                likes.map((like, index) => {
                                    return (
                                        <div className="postLikes" key={index}>
                                            <div className="cardLikes">
                                                <div className='cardLikescentro'>
                                                    <h1 className='letras'>Titulo Post: {like.titulo}</h1>
                                                </div>
                                                <div className='cardLikesIzq'>
                                                    <img className='imagenUsuarioHome' src={
                                                        like.usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : like.usuario.foto
                                                    } /><p className='letras1'>{like.usuario.nombre} {like?.usuario.apellidos}</p>
                                                </div>
                                                <div className="cardLikesDrc">
                                                    <p className='letras1'>Fecha del Post: {like?.fecha}</p>
                                                    <button className='botonLikes' onClick={() => escogeHilo(like._id)}>Ver Post</button>
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
            <div className='paginaLikes'>
                <Header />
                <div className="contenidoLikes">
                    <Margin />
                    <div className='cuerpoLikes'>
                        <div className="foroPostLikes">
                            <div className='espinner'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default connect((state) => ({
    credenciales: state.credenciales,
    datosHilo: state.datosHilo,
    perfil: state.datosPerfil
}))(Likes);