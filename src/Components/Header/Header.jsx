import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Header.css';


const Header = (props) => {
    return (
        <div className='designHeader'>{props.credenciales?.usuario.nombre}{props.credenciales?.usuario.apellidos}
        </div>
    )
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Header);