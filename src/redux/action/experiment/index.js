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
const getListExp = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/experiment/?page=${data.page}&pageSize=${data.pageZie}`).then(response => {
      dispatch({
        type: 'GET_EXP',
        data: response.data
      })
    })
  }
}

const getTrainning = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.get(`${url}/experiment/get-all-traning-results/?id_paramsconfigs=${data.id_paramsconfigs}`).then(response => {
      dispatch({
        type: 'GET_TRAINNING',
        data: response.data
      })
    })
  }
}

const searchListExp = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    if (data.id_softlib === '') {
      await axios.get(`${url}/experiment/search_exp/?keyword=${data.keyword}&page=${data.page}&pageSize=${data.pageSize}`).then(response => {
        dispatch({
          type: 'SEARCH_EXP',
          data: response.data
        })
      })
    } else {
      await axios.get(`${url}/experiment/search_exp/?keyword=${data.keyword}&page=${data.page}&pageSize=${data.pageSize}&id_softlib=${data.id_softlib}`).then(response => {
        dispatch({
          type: 'SEARCH_EXP',
          data: response.data
        })
      })
    }
  }
}
// update identification
const updateExp = (data, file) => {
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
            dispatch(getListExp({
              pageNumber: 1,
              pageZie: 10
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
          }).catch(
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
        dispatch(getListExp({
          pageNumber: 1,
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
      }).catch(
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
  }

}
const deleteExp = (data) => {
  const url = process.env.REACT_APP_API_URL
  return async dispatch => {
    await axios.delete(`${url}/experiment/${data}/`, {
      headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      dispatch(getListExp({
        page: 1,
        pageZie: 16
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
    }
    )
  }
}
const addExp = (data) => {
  const url = process.env.REACT_APP_API_URL
  const data1 = {
    expname: data.expname,
    expcreatedtime: new Date(),
    expmodelid: data.expmodelid,
    expdatasetid: data.expdatasetid,
    expsoftwarelibid: data.expsoftwarelibid
  }
  return async dispatch => {
    await axios.post(`${url}/experiment/`, data1
      , {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },

      }).then(response => {
        axios.get(`${url}/experiment/start-train/?id_exp=${response.data.expid}&paramsconfigs_json=${data.paramsconfigs_json}`, {
          headers: {
            'content-type': 'application/json'
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }).then(response => {
          dispatch({
            type: 'ADD_EXP',
            data: response.data
          })
        })
      })
  }
}
export {
  getListExp,
  updateExp,
  deleteExp,
  addExp,
  searchListExp,
  getTrainning
}