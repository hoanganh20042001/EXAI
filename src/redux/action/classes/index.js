import axios from 'axios'
import FormData from 'form-data'
axios.defaults.withCredentials = true
function getAuthToken() {
  return window.localStorage.getItem("access_token") ?? ""
}
import Avatar from '@components/avatar'
import { toast } from 'react-hot-toast'
import { X, Check } from 'react-feather'
const userData = JSON.parse(localStorage.getItem('userData'))
// ** Get all Data
const getListClass = (data) => {
  const url = process.env.REACT_APP_API_URL
  if (data.role === 1) {
    return async dispatch => {
      await axios.get(`${url}/classes/?page=${data.pageNumber}&pageSize=10`, {
        withCredentials: true
      }).then(response => {
        dispatch({
          type: 'GET_CLASS',
          data: response.data
        })
      })
    }
  } else {
    return async dispatch => {
      await axios.get(`${url}/danh-sach-lop-gv-phu-trach/?page=${data.pageNumber}&user_id=${data.user_id}`, {
        withCredentials: false
      }).then(response => {
        dispatch({
          type: 'GET_CLASS',
          data: response.data
        })
      })
    }
  }
}
const getListClassBySoftID = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/experiment/get-list-Classs/?page=${data.page}&pageSize=${data.pageSize}&id_softlib=${data.id_softlib}`).then(response => {
      dispatch({
        type: 'GET_CLASS_BYSOFTID',
        data: response.data
      })
    })
  }
}
const getUserClass = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/danh-sach-lop-gv-phu-trach/${data}/?page=1`).then(response => {
      dispatch({
        type: 'GET_USER_CLASS',
        data: response.data
      })
    })
  }
}
// update identification
const updateClass = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.put(`${url}/classes/${data.classid}/`, data, {
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch(getListClass({
        pageNumber: 1,
        role: userData.roleid,
        user_id: userData.id
      }))
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Bạn đã cập nhật thông tin thành công!</h6>
          </div>
        </div>
      )
    }).catch(err => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Có lỗi xảy ra!</h6>
          </div>
        </div>
      )
    })
  }

}
const deleteClass = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.delete(`${url}/classes/${data}/`, {
      headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch(getListClass({
        pageNumber: 1,
        role: userData.roleid,
        user_id: userData.id
      }))
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Bạn đã xóa thông tin thành công!</h6>
          </div>
        </div>
      )
    }).catch(err => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Có lỗi xảy ra!</h6>
          </div>
        </div>
      )
    })
  }
}
const addClass = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.post(`${url}/classes/`, data, {
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch(getListClass({
        pageNumber: 1,
        role: userData.roleid,
        user_id: userData.id
      }))
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Bạn đã thêm thông tin thành công!</h6>
          </div>
        </div>
      )
    }).catch(err => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Có lỗi xảy ra!</h6>
          </div>
        </div>
      )
    })
  }
}
export {
  getListClass,
  getListClassBySoftID,
  updateClass,
  deleteClass,
  addClass,
  getUserClass
}