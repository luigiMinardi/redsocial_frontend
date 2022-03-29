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
                    <div className="foroPost">
                        <div className="postCabeza">
                            <div className="nombreUsuario"><p>Nombre de Usuario</p></div>
                            <div className="fechaPost"><p>Fecha de Post</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default Registrar;
// export default connect()(Registrar);