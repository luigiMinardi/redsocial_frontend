import { DATOS_PERFIL } from '../actions';

const initialState = {
    _id: '',
};

const datosPerfilReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATOS_PERFIL:
            return {...state, _id: action.payload};
        default:
            return state;
    }
}

export default datosPerfilReducer;