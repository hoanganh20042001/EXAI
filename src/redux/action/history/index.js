import axios from 'axios'
function getAuthToken() {
  return window.localStorage.getItem("access_token") ?? ""
}
// ** Get all Data
const getListHistory = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/Users/getloguseraction?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}&userid=${data.userid}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch({
        type: 'GET_HISTORY',
        data: response.data
      })
    })
  }
}
export {
  getListHistory
}