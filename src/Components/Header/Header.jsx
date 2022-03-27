import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Input,Button} from 'antd';

import './Header.css';

const Header = (props) => {

        return (
            <div className='designHeader'>
                    {console.log ("estamos como admin")}
            </div>
        )

    } 



export default connect (Header);

//..