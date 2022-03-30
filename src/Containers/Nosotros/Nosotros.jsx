import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Nosotros.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';





const Nosotros = (props) => {

    return (
        <div className='designHome'>

            <Header />
            <div className="contenido">
                <Margin />
                <div className='cuerpo'>
                    <div className="foroPost">
                        <div className="postCabeza">
                            <div className="sobreNosotros"><p>Sobre Nosotros</p></div>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed metus id metus malesuada dapibus. Phasellus ultricies efficitur quam, ac commodo nulla aliquet vehicula. Vivamus consectetur imperdiet sapien ac porttitor. Sed sit amet augue dictum, tincidunt velit convallis, luctus dolor. Nullam tincidunt augue sit amet ex convallis, eu bibendum turpis congue. Fusce fringilla, erat vitae tempus ultricies, ex neque laoreet mauris, a hendrerit augue justo vitae est. Integer suscipit maximus ante sit amet suscipit. Aenean fermentum rutrum nulla vel suscipit. Donec consequat quis diam nec laoreet. Phasellus non lobortis nunc.
                    </div>
                </div>
            </div>
        </div>
    )

}



export default Nosotros;
// export default connect()(Nosotros);