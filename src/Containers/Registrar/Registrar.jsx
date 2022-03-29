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
                <div className='cuerpo'>
                </div>
            </div>
        </div>
    )

}



export default Registrar;
// export default connect()(Registrar);