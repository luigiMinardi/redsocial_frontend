import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Registrar.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';




const Registrar = (props) => {

    return (
        <div className='designRegistrar'>
            <Header />
            <div className="contenido">
                <Margin />
                <div className='cuerpoRegistrar'>


                    <div className="foroPost2">
                        <div className="postCabeza">
                            <div className="registrarAqui"><p>Registrar Aqui</p></div>
                        </div>
                        <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder="Nombre:" autoComplete="off" />
                        <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder="Apellidos:" autoComplete="off" />
                        <input className='input' type="text" name="edad" id="edad" title="edad" placeholder="Edad" autoComplete="off" />
                        <input className='input' type="text" name="telefono" id="telefono" title="telefono" placeholder="Telefono" autoComplete="off" />
                        <input className='input' type="text" name="correo" id="correo" title="correo" placeholder="Correo Electronico" autoComplete="off" />
                        <input className='input' type="text" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" />
                        <div className="botonRegistro">
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