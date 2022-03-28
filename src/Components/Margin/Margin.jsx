import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Input,Button} from 'antd';
import './Margin.css';

const Margin = (props) => {
console.log ("estamos como admin")
        return (
            <div className='designMargin'>
               <p>Home</p>    
               <p>Registrar</p>    
               <p>Usuario/Iniciar Session</p>    
               <p>Sobre Nosotros</p>    
               <p>Cerrar Session</p>    
            </div>
        )

    } 


export default Margin;