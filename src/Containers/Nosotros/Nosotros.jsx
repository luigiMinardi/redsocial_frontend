import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Nosotros.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Nosotros = (props) => {

    return (
        <div className='designNosotros'>

            <Header />
            <div className="contenidoNosotros">
                <Margin />
                <div className='cuerpoNosotros'>
                    <div className="foroNosotros">
                        <div className="nosotrosCabeza">
                            <div className="sobreNosotros"><p>Sobre Nosotros</p></div>
                        </div>
                        ¡Bienvenido al coolforum! ¡Un santuario de librepensadores y un lugar genial donde puedes charlar con tus amigos, seguir las actividades de los demás, publicar pensamientos interesantes y divertidos y compartir chistes divertidos!Regístrese y cree una cuenta con nosotros. Es totalmente gratuito y te da acceso a todos nuestros contenidos.</div>
                </div>
            </div>
        </div>
    )

}



export default Nosotros;
// export default connect()(Nosotros);