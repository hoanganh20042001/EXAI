// ** React Imports
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// ** Icons Imports
import { Check, Rss, Info, Image, Users, Edit, X } from 'react-feather'
import Avatar from '@components/avatar'
import { getListClass } from '@store/action/classes'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Col, Label, Input, NavItem, NavLink, Button, ModalBody, ModalHeader, Modal, Row } from 'reactstrap'
import { getListUser, updateUser, deleteUser, addUser, updatePass, getInfo } from '@store/action/profile'
import { useSelector, useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { toDateStringFormat1, toDateString } from '@utils'
import axios from 'axios'

import withReactContent from 'sweetalert2-react-content'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)
const ProfileHeader = ({ data }) => {
  // ** States
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(true)

  const toggle = () => setIsOpen(!isOpen)
  const dispatch = useDispatch()
  const [infoData, setInfo] = useState({
  })
  const [pass, setPass] = useState({
    new_password: '',
    old_password: ''
  })
  const [confirm, setConfirm] = useState()
  const [picker, setPicker] = useState(new Date())
  const [showEdit, setShowEdit] = useState(false)
  const [showChange, setShowChange] = useState(false)

  const [valErrors, setValErrors] = useState({
    email: '',
    name: '',
    password: '',
    usrfullname: '',
    usrdob: '',
    usrfaculty: ''
  })

  const dataClass = useSelector((state) => {
    return state.classes.dataClass
  })
  const dataUser = useSelector((state) => {
    return state.profile.dataUser
  })
  useEffect(() => {
    dispatch(getListClass({
      pageNumber: 1
    }))
  }, [dispatch])
  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    dispatch(getInfo(userData.id))
  }, [])
  // ** vars
  const [showRequets, setShowRequest] = useState(dataUser.roleid !== 1 && dataUser.chose_class === false)
  const [idclass, setClass] = useState()
  const handleAdd = () => {
    const url = process.env.REACT_APP_API_URL
    axios.post(`${url}/request-to-class/`, {
      id_class: idclass,
      id_user: userData.id
    }, {
      withCredentials: true
    })
      .then(res => {
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Vui lòng chờ quản trị viên phê duyệt lớp'
        })
        setShowRequest(false)
        dispatch(getInfo(userData.id))
      })
      .catch(err => {
        MySwal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: 'Có lỗi xảy ra',
          customClass: {
            confirmButton: 'btn btn-error'
          }
        })
      })

  }
  const onSubmit = data => {
    if (Object.values(data)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
  const handleOnChange = (data, pop) => {
    console.log(data)
    setInfo({ ...infoData, [pop]: data })
  }
  const handleUpdate = () => {
    console.log(infoData)
    dispatch(updateUser({
      id: infoData.id,
      email: infoData.email,
      name: infoData.name,
      password: infoData.password,
      usrfullname: infoData.usrfullname,
      usrdob: infoData.usrdob,
      usrfaculty: infoData.usrfaculty,
    }))
    dispatch(getInfo(userData.id))
    // dispatch(getInfo(userData.id))
    // localStorage.removeItem('userData')
    // localStorage.setItem('userData', JSON.stringify(getInfo(userData.id)))
    // window.location.reload()
    setEdit(true)
    setShowEdit(false)
  }
  const handleChangePassWord = async () => {
    const url = process.env.REACT_APP_API_URL
    await axios.put(`${url}/change-password/`, {
      old_password: pass.old_password,
      new_password: pass.new_password

    }, {
      withCredentials: true

    }).then(response => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Bạn đã đổi mật khẩu thành công!</h6>
          </div>
        </div>
      )

      setShowChange(false)
      //   console.log(response.data.data[0].data)
    }).catch(function (error) {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Mật khẩu cũ không chính xác!</h6>
          </div>
        </div>
      )

    })
  }
  const handleEdit = (data) => {
    setShowEdit(true)
    setInfo({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      usrfullname: data.usrfullname,
      usrdob: data.usrdob,
      usrfaculty: data.usrfaculty,
    })
  }
  const handleChange = (data) => {
    setShowChange(true)
  }
  return (
    <Card className='profile-header mb-2'>
      <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0' style={{ marginLeft: '5px' }}>
              <Button color='primary' onClick={() => handleEdit(data)}>
                <Edit className='d-block d-md-none' size={14} />
                <span className='fw-bold d-none d-md-block'>Cập nhật thông tin cá nhân</span>
              </Button>
              <Button color='primary' onClick={() => handleChange(data)}>
                <Edit className='d-block d-md-none' size={14} />
                <span className='fw-bold d-none d-md-block'>Đổi mật khẩu</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
      <Modal isOpen={showEdit} toggle={() => setShowEdit(!showEdit)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Sửa thông tin người dùng</h1>
            <p>Cập nhật chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='email'>
                Email
              </Label>
              <Input id='email' type='text' value={infoData.email} onChange={(e) => handleOnChange(e.target.value, "email")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.email}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='name'>
                Tên người dùng
              </Label>
              <Input id='name' type='text' value={infoData.name} onChange={(e) => handleOnChange(e.target.value, "name")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.name}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfullname'>
                Tên đầy đủ
              </Label>
              <Input id='usrfullname' type='text' value={infoData.usrfullname} onChange={(e) => handleOnChange(e.target.value, "usrfullname")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.usrfullname}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrdob' >
                Ngày sinh
              </Label>
              <Flatpickr
                value={infoData.usrdob}
                id='date-time-picker'
                className='form-control'
                options={{
                  dateFormat: "Y-m-d",

                }}
                onChange={date => handleOnChange(toDateStringFormat1(date), "usrdob")}
              />
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfaculty'>
                Khoa
              </Label>
              <Input id='usrfaculty' type='text' value={infoData.usrfaculty} onChange={(e) => handleOnChange(e.target.value, "usrfaculty")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.usrfaculty}</p>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={e => setEdit(false)} style={{ display: edit === true ? 'inline-block' : 'none' }}>
                Chỉnh sửa
              </Button>
              <Button type='submit' className='me-1' color='primary' onClick={handleUpdate} style={{ display: edit === true ? 'none' : 'inline-block' }}>
                Cập nhật
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => {
                setEdit(true)
                setShowEdit(false)
              }
              }>
                Hủy
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={showChange} toggle={() => setShowChange(!showChange)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowChange(!showChange)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Đổi mật khẩu</h1>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>

            <Col md={12} xs={12}>
              <Label className='form-label' for='password'>
                Mật khẩu cũ
              </Label>
              <Input id='password' type='password' value={infoData.password} onChange={(e) => setPass({ ...pass, ['old_password']: e.target.value })} />

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfaculty'>
                Mật khẩu mới
              </Label>
              <Input id='usrfaculty' type='password' value={infoData.usrfaculty} onChange={(e) => setPass({ ...pass, ['new_password']: e.target.value })} />

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfaculty'>
                Xác nhận mật khẩu mới
              </Label>
              <Input id='usrfaculty' type='password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              {
                pass.new_password === confirm ? <></> : <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>Mật khẩu xác nhận không trùng khớp</p>
              }
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={handleChangePassWord} disabled={pass.new_password !== confirm}>
                Cập nhật
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => {
                setShowChange(false)
              }
              }>
                Hủy
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* <Modal isOpen={showRequets} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' ></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Đăng kí lớp</h1>
            <p>Chọn lớp để tiếp tục sử dụng phần mềm</p>
          </div>
          <Row tag='form' className='gy-1 pt-75'>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classname'>
                Chọn lớp
              </Label>
              <Input type='select' name='idclass' id='idclass' value={idclass} onChange={e => {
                console.log(e.target.value)
                setClass(e.target.value)
              }}>
                < option value="" > Chọn lớp học</option>
                {
                  dataClass.results && dataClass.results.map(item => {
                    return (< option value={`${item.classid}`} > {item.classname}</option>)
                  })
                }
              </Input>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='button' className='me-1' color='primary' onClick={handleAdd} >
                Đăng kí
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal> */}
    </Card>
  )
}

export default ProfileHeader
