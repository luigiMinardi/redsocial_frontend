import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Header.css';


const Header = (props) => {
    return (
        <div className='designHeader'><p className='letrasHeader'>{props.credenciales?.usuario.nombre} {props.credenciales?.usuario.apellidos}</p>
        </div>
    )
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Header);