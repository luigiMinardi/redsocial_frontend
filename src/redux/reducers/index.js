import { combineReducers } from 'redux';

import credenciales from './datosLogin.reducer';
import datosHilo from './datosHilo.reducer';
import datosPerfil from './datosPerfil.reducer';

const rootReducer = combineReducers({
    credenciales,
    datosHilo,
    datosPerfil
});

export default rootReducer;