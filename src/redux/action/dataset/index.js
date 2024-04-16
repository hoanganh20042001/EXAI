import axios from 'axios'
import FormData from 'form-data'
axios.defaults.withCredentials = true
function getAuthToken() {
  return window.localStorage.getItem("access_token") ?? ""
}
import Avatar from '@components/avatar'
import { toast } from 'react-hot-toast'
import { X, Check } from 'react-feather'
// ** Get all Data
const getListData = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    if (data.datasetName) {
      await axios.get(`${url}/datasets/?page=${data.page}&pageSize=${data.pageSize}&datasetName=${data.datasetName}`).then(response => {
        dispatch({
          type: 'GET_DATA',
          data: response.data
        })
      })
    } else {
      await axios.get(`${url}/datasets/?page=${data.page}&pageSize=${data.pageSize}`).then(response => {
        dispatch({
          type: 'GET_DATA',
          data: response.data
        })
      })
    }
   
  }
}
const getListDataBySoftID = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/experiment/get-list-dataset/?page=${data.page}&pageSize=${data.pageSize}&id_softlib=${data.id_softlib}`).then(response => {
      dispatch({
        type: 'GET_DATA_BYSOFTID',
        data: response.data
      })
    })
  }
}
// update identification
const updateData = (data, file) => {
  const url = process.env.REACT_APP_API_URL
  if (file) {
    const data1 = new FormData()
    data1.append('file', file)
    return async dispatch => {
      await axios.post(`${url}/upload-datasets-zip/`, data1
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },

        }).then(response => {
          const data2 = {
            datasetdescription: data.datasetdescription,
            datasetfolderurl: response.data.data,
            datasetname: data.datasetname,
            datasetsoftID: data.datasetsoftID,
            datasetsum: data.datasetsum,
            datasettype: data.datasettype
          }
          axios.put(`${url}/datasets/${data.datasetid}/`, data2, {
            headers: {
              'content-type': 'application/json'
              // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }).then(response => {
            dispatch(getListData({
              page: 1,
              pageSize: 10
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
            return (
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
            )
          })
        })
    }
  } else {
    const data2 = {
      datasetdescription: data.datasetdescription,
      datasetfolderurl: data.datasetfolderurl,
      datasetname: data.datasetname,
      datasetsoftID: data.datasetsoftID,
      datasetsum: data.datasetsum,
      datasettype: data.datasettype
    }
    return async dispatch => {
      await axios.put(`${url}/datasets/${data.datasetid}/`, data2, {
        headers: {
          'content-type': 'application/json'
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(response => {
        dispatch(getListData({
          page: 1,
          pageSize: 10
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
        return (
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
        )
      }
      )
    }
  }

}
const deleteData = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.delete(`${url}/datasets/${data}/`, {
      headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch(getListData({
        page: 1,
        pageSize: 10
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
      return (
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
      )
    }
    )
  }
}
const addData = (data, file) => {
  const url = process.env.REACT_APP_API_URL
  const data1 = new FormData()
  data1.append('file', file)
  return async dispatch => {
    await axios.post(`${url}/upload-datasets-zip/`, data1
      , {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },

      }).then(response => {
        const data2 = {
          datasetdescription: data.datasetdescription,
          datasetfolderurl: response.data.data,
          datasetname: data.datasetname,
          datasetsoftID: data.datasetsoftID,
          datasetsum: data.datasetsum,
          datasettype: data.datasettype
        }
        axios.post(`${url}/datasets/`, data2, {
          headers: {
            'content-type': 'application/json'
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }).then(response => {
          dispatch(getListData({
            page: 1,
            pageSize: 10
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
          return (
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
          )
        })
      })
  }
}
export {
  getListData,
  getListDataBySoftID,
  updateData,
  deleteData,
  addData
}