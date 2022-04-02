import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './NuevoPost.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const NuevoPost = () => {
    let navigate = useNavigate();
    //hooks
    const [datosUsuario, setDatosUsuario] = useState({
        titulo: "",
        cuerpo: "",
        foto: "",
    });

    const [msgError, setMsgError] = useState("");
    //useEffect

    useEffect(() => {
        //se ejecuta la primera vez que se ejecuta tan solamente
    }, []);

    useEffect(() => {
        //se ejecuta cada vez que se actualiza CUALQUIER HOOK  
    })


    //Handler (manejador)
    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const crearPost = async (props) => {
        let body = {
            titulo: datosUsuario.titulo,
            cuerpo: datosUsuario.cuerpo,
        }
        try {
            let resultado = await axios.post(`${baseURL}/hilos`, body);
            console.log(resultado);

            setTimeout(() => {
                navigate("/");
            }, 500);

        } catch (error) {
            console.log(error.response);
            console.log(error, 'error');
        }
    }


    return (
        <div className='paginaNuevoPost'>
            <Header />
            <div className="contenidoNuevoPost">
                <Margin />
                <div className='cuerpoNuevoPost'>
                    <div className="foroPostNuevoPost">
                        <div className="postCabezaNuevoPost"></div>
                        <div className='contenidoPostNuevoPost'>
                            <input className='inputNuevoPost' type="text" name="titulo" id="titulo" title="titulo" placeholder="Titulo del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <input className='inputNuevoPost' type="cuerpo" name="cuerpo" id="cuerpo" title="cuerpo" placeholder="Descripción del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <div className="botonNuevoPost"onClick={() => crearPost()}>
                                Crear Publicación
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default NuevoPost;