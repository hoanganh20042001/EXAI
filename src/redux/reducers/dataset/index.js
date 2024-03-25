// ** Initial State
const initialState = {
    dataDataset: []
}

const dataDataset = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return { ...state, dataDataset: action.data }
        case 'GET_DATA_BYSOFTID':
            return { ...state, dataDataset: action.data }
        case 'UPDATE_DATA':
            return { ...state, dataDataset: action.data }
        case 'DELETE_DATA':
            return { ...state, dataDataset: action.data }
        case 'ADD_DATA':
            return { ...state, dataDataset: action.data }
        default:
            return { ...state }
    }
}

export default dataDataset