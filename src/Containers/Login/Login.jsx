import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { baseURL } from '../../utiles';
import './Login.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';

//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';



const Login = (props) => {

    let navigate = useNavigate();

    // 1 - Hooks (Equivalen al estado en los componentes de clase)
    const [ credenciales, setCredenciales ] = useState("");
    const [ datosUsuario, setDatosUsuario ] = useState({correo: '', clave: ''});
    const [ msgError, setMsgError ] = useState('');
    const [ msgError2, setMsgError2 ] = useState('');

    // Funciones handlers
    const rellenarDatos = (e) => {
        //Funcion handler que setea los datos en el hook...[e.target.name] obtiene 
        //el nombre de la propiedad a cambiar, e.target.value tiene el valor..ambos
        //obtienen los datos del evento, que es el hecho de escribir en un input en concreto
        setDatosUsuario({...datosUsuario, [e.target.name]: e.target.value})         // SIEMPRE SE ESCRIBE ASÍ
    };

    const checkClave = (e) => {
        if(e.target.value.length < 4){
            setMsgError("La contraseña debe de tener al menos 4 caracteres");
        } else {
            setMsgError("");
        }
    };

    useEffect(()=>{
        //Este useEffect se ejecutará por cada vez que se actualize el 
        //componente. Es decir, cuando cambie un hook y por lo tanto se actualize el componente.
        //Es peligroso cambiar hooks aqui, si no tenemos condicionales que eviten
        //que entremos en bucles infinitos.
        if(credenciales?.token !== undefined){
            setTimeout(()=>{
                navigate("/");
            }, 3000);
        };
    });

    const Login = async () => {
        try {
            // Las credenciales que pone el Usuario en la pagina Login.
            let body = {
                correo: datosUsuario.correo,
                clave: datosUsuario.clave
            }
            let resultado = await axios.post(`${baseURL}usuarios/login`, body);          // AQUI ES DONDE VA EL ENDPOINT DEL BACKEND.
            // Cambiamos el valor del Hook credenciales, por lo tanto recargará el componente.
            if(resultado.data === 'Usuario o contraseña inválido'){
                setMsgError2('Usuario o contraseña inválido')
            } else {
                setCredenciales(resultado.data)
                    // GUARDAMOS LOS DATOS DEL LOGIN EN REDUX.
                props.dispatch({type:LOGIN, payload: resultado.data});
                setTimeout(()=>{
                    navigate("/");
                },1500);
            }
            console.log(resultado);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='paginaLogin'>
            <Header />
            <div className="contenidoLogin">
                <Margin />
                <div className='cuerpo'>
                    <div className='login'>
                    <div className="postCabeza2">
                    <p className='letras'>Introduce tus datos.</p>
                    </div>
                    <input className='input2' type="text" name="correo" id="correo" title="correo" placeholder="Correo Electronico" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input className='input2' type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{rellenarDatos(e); checkClave(e)}} />
                    <div className="botonLogin" onClick={()=>Login()}>Iniciar Sesión</div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default connect()(Login);