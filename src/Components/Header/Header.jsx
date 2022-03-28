import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Input,Button} from 'antd';

import './Header.css';

const Header = (props) => {
console.log ("estamos como admin")
        return (
            <div className='designHeader'> Logo
                   
            </div>
        )

    } 


export default Header;
// export default connect (Header);

//..