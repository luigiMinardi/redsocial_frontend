import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './NuevoPost.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const NuevoPost = () => {

    return (
        <div className='paginaNuevoPost'>
            <Header />
            <div className="contenidoNuevoPost">
                <Margin />
                <div className='cuerpoNuevoPost'>
                    <div className="foroPostNuevoPost">
                        <div className="postCabezaNuevoPost"></div>
                        <div className='contenidoPostNuevoPost'>
                            <input className='inputNuevoPost' type="text" name="titulo" id="titulo" title="titulo" placeholder="Titulo del Post" autoComplete="off" />
                            <input className='inputNuevoPost' type="cuerpo" name="cuerpo" id="cuerpo" title="cuerpo" placeholder="Descripción del Post" autoComplete="off" />
                            <div className="botonNuevoPost">
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