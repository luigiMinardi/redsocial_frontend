import { combineReducers } from 'redux';


import credenciales from './datosLogin-reducer';
import datosHilo from './datosHilo-reducer';


const rootReducer = combineReducers({
    credenciales,
    datosHilo
});

export default rootReducer;