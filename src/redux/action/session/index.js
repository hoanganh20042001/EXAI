import axios from 'axios'
function getAuthToken() {
  return window.localStorage.getItem("access_token") ?? ""
}
// ** Get all Data
const getSession = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/Users/getloguserlogin?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch({
        type: 'GET_SESSION',
        data: response.data
      })
    })
  }
}
export {
  getSession
}