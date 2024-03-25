import axios from 'axios'
function getAuthToken() {
  return window.localStorage.getItem("access_token") ?? ""
}
// ** Get all Data
const getListRequest = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/list-class-user/?page=${data.pageNumber}`, {
      withCredentials: true
    }).then(response => {
      dispatch({
        type: 'GET_REQUEST',
        data: response.data
      })
    })
  }
}
const getInfo = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}accounts/${data}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch({
        type: 'GET_INFO',
        data: response.data
      })
    })
  }
}
// update identification
const updatePass = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.put(`${url}/change-password/`, {
      new_password: data.new_password,
      old_password: data.old_password
    }, {
      withCredentials: true

    }).then(response => {
      dispatch({
        type: 'UPDATE_PASS',
        data: response.data
      })
      //   console.log(response.data.data[0].data)
    })
  }
}
const updateRequest = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.put(`${url}/accounts/${data.id}/`, {
      email: data.email,
      name: data.name,
      password: data.password,
      usrfullname: data.usrfullname,
      usrdob: data.usrdob,
      usrfaculty: data.usrfaculty,
    }, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }

    }).then(response => {
      dispatch({
        type: 'UPDATE_REQUEST',
        data: response.data
      })
      //   console.log(response.data.data[0].data)
    })
  }
}
const deleteRequest = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.delete(`${url}/accounts/${data}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }

    }).then(response => {
      dispatch({
        type: 'DELETE_REQUEST',
        data: response.data
      })
      //   console.log(response.data.data[0].data)
    })
  }
}
const addRequest = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.post(`${url}/accounts/`, data, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }

    }).then(response => {
      dispatch({
        type: 'ADD_REQUEST',
        data: response.data
      })
      //   console.log(response.data.data[0].data)
    })
  }
}
export {
  getListRequest,
  updateRequest,
  deleteRequest,
  addRequest,
  getInfo,
  updatePass
}