import { DATOS_HILO , MODIFICAR_HILO } from '../actions';

const initialState = {
    _id: ''
};

const datosHiloReducer = (state = initialState, action) => {
    switch (action.type) {
        //GUARDO EN EL ESTADO LOS DATOS DE LA PUBLICACION
        case DATOS_HILO:
            return { ...state, _id: action.payload };

        case MODIFICAR_HILO:
            return { ...state, _id: action.payload };

        default:
            return state
    }
}

export default datosHiloReducer;