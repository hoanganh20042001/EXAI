// ** Initial State
const initialState = {
    dataUser: {}
}

const dataUser = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...state, dataUser: action.data }
        case 'GET_INFO':
            return { ...state, dataUser: action.data }
        case 'UPDATE_USER':
            return { ...state, dataUser: action.data }
        case 'DELETE_USER':
            return { ...state, dataUser: action.data }
        case 'ADD_USER':
            return { ...state, dataUser: action.data }
        case 'UPDATE_PASS':
            return { ...state, dataUser: action.data }
        case 'SEARCH_USER':
            return { ...state, dataUser: action.data }
        case 'GET_USER_NOCLASS':
            return { ...state, dataUser: action.data }
        default:
            return { ...state }
    }
}

export default dataUser