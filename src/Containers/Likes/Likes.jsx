import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Likes.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';

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
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.credenciales.usuario._id}/likes`, config);
            console.log(respuesta.data.usuario.likes)
            setTimeout(() => {
                setlikes(respuesta.data.usuario.likes);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
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
                                likes.map((usuario, index) => {
                                    return (
                                        <div className="postLikes" key={index}>
                                            <div className="cardLikes">
                                                <div className='cardLikesIzq'>
                                                    <img className='imagenLikes' src={
                                                        usuario.usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : usuario.usuario.foto
                                                    } />
                                                    <button className='botonPerfil'>Ver Post</button>
                                                </div>
                                                <div className="cardLikesDrc">
                                                    <p className='letras1'>Titulo del Post: {usuario.titulo}</p>
                                                    <p className='letras1'>Nombre: {usuario.usuario.nombre} {usuario?.usuario.apellidos}</p>
                                                    <p className='letras1'>Ciudad: {usuario.ciudad !== '' ? 'Secreto' : usuario.ciudad}</p>
                                                    <p className='letras1'>Fecha del Post: {usuario?.fecha}</p>
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
    credenciales: state.credenciales
}))(Likes);


// "_id": otraResConOtroUsuario.body._id,
// "likes": [
//     {
//         "_id": resHiloBase.body[0]._id,
//         "fecha": "2022-03-03T07:32:37.341Z",
//         "titulo": "Test",
//         "usuario": {
//             "_id": resBase.body._id,
//             "apellidos": "Testing",
//             "foto": "http://blank.page",
//             "nombre": "Test",
//         },