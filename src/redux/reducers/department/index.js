// ** Initial State
const initialState = {
    dataDepartment: {}
}

const dataDepartment = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DEPARTMENT':
            return { ...state, dataDepartment: action.data }
        case 'UPDATE_DEPARTMENT':
            return { ...state, dataDepartment: action.data }
        default:
            return { ...state }
    }
}

export default dataDepartment