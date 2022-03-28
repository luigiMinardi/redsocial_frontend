import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Home.css';
import Margin from '../../Components/Margin/Margin';





const Home = (props) => {

        return (
            <div className='designHome'> 
                <Margin/> 
                    <div className='cuerpo'>
                        <img className='foroImg'/>   
                        <div className="foroPost">
                            <div className="postCabeza">
                                <div className="nombreUsuario"></div>
                            </div>
                        </div>

                    </div>
            </div>
        )
        
}



export default Home;
// export default connect()(Home);