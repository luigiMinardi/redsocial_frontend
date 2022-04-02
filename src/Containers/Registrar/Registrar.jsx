import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


import './Registrar.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';


const Registrar = () => {

    let navigate = useNavigate();
    //hooks
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: "", apellidos: "", edad: "",
        telefono: "", correo: "", clave: "",
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


    //Funciones locales del componente

    const registrame = async (props) => {

        let body = {
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            edad: datosUsuario.edad,
            telefono: datosUsuario.telefono,
            ciudad: datosUsuario.ciudad,
            correo: datosUsuario.correo,
            clave: datosUsuario.clave,
        }

        console.log("Esto se llama cuerpo", body);
        //3 send to axios

        try {
            let resultado = await axios.post(`${baseURL}/usuarios`, body);
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
        <div className='designRegistrar'>
            <Header />
            <div className="contenido">
                <Margin />
                <div className='cuerpoRegistrar'>
                    <div className="foroPostRegistrar">
                        <div className="postCabeza">
                            <p className='letras'>Registro</p>
                        </div>
                        <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder="Nombre:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder="Apellidos:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="date" name="edad" id="edad" title="edad" placeholder="Fecha de Nacimiento" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="telefono" id="telefono" title="telefono" placeholder="Telefono (opcional)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="ciudad" id="ciudad" title="ciudad" placeholder="Ciudad (opcional)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="email" name="correo" id="correo" title="correo" placeholder="Correo Electronico" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <div className="botonRegistro" onClick={() => registrame()}>
                            Registrar!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}





export default Registrar;
// export default connect()(Registrar);