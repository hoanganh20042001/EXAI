// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// ** Table Data & Columns
import { data } from './data'
import { Controller, useForm } from 'react-hook-form'
import Avatar from '@components/avatar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, CheckCircle, Printer, FileText, File, Grid, Copy, Plus, Edit, Trash, Check, Slash, X } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { getListUser, updateUser, deleteUser, addUser } from '@store/action/profile'
import { toDateStringFormat1, toDateString } from '@utils'
import style from './style.css'
import Flatpickr from 'react-flatpickr'
import axios from 'axios'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Modal,
  ModalBody,
  ModalHeader, ModalFooter,
  Badge
} from 'reactstrap'
import { format } from 'prettier'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const ManageAccount = () => {
  // ** States
  // const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [showAccept, setShowAccept] = useState(false)
  const [infoData, setInfo] = useState({
  })

  const [picker, setPicker] = useState(new Date())
  const [object, setObject] = useState(true)
  const [edit, setEdit] = useState(true)
  const [infoaddData, setInfoadd] = useState({
    id: '',
    email: null,
    name: null,
    password: null,
    roleid: 3,
    usrfullname: '',
    usrdob: '',
    usrfaculty: ''
  })
  const [file, setFile] = useState()
  const [valErrors, setValErrors] = useState({
    email: '',
    name: '',
    password: '',
    usrfullname: '',
    usrdob: '',
    usrfaculty: ''
  })
  const dataUser = useSelector((state) => {
    return state.profile.dataUser
  })
  useEffect(() => {
    dispatch(getListUser({
      pageSize: 10,
      pageNumber: currentPage + 1
    }))
  }, [dispatch, currentPage])
  // const status = {
  //   1: { title: 'Current', color: 'light-primary' },
  //   2: { title: 'Professional', color: 'light-success' },
  //   3: { title: 'Rejected', color: 'light-danger' },
  //   4: { title: 'Resigned', color: 'light-warning' },
  //   5: { title: 'Applied', color: 'light-info' }
  // }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const handleDelete = (data) => {
    setShowDelete(true)
    setInfo({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      roleid: data.roleid,
      usrfullname: data.usrfullname,
      usrdob: data.usrdob,
      usrfaculty: data.usrfaculty,
    })
  }

  const handleUpdate = () => {
    dispatch(updateUser(infoData))
    setEdit(true)
    setShowEdit(false)
  }
  const handleAcceptAccount = () => {
    const url = process.env.REACT_APP_API_URL
    axios.put(`${url}/confirm-user-request/`, {
      id_user: infoData.id,
      status: true
    })
      .then(res => {
        toast(
          <div className='d-flex'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6>Bạn đã phê duyệt thành công!</h6>
            </div>
          </div>
        )
        setEdit(true)
        setShowAccept(false)
        dispatch(getListUser({
          pageSize: 10,
          pageNumber: currentPage + 1
        }))
      })
      .catch(err => {
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
  const handleAdd = () => {
    dispatch(addUser(infoaddData))
    setShowAdd(false)
  }
  const handleDelet = () => {
    dispatch(deleteUser(infoData.id))
    setEdit(true)
    setShowDelete(false)
    
  }
  const handleHistory = (data) => {
    navigate(`/managements/userHistory/${data}`)
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
  const handleEdit = (data) => {
    setShowEdit(true)
    setInfo({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      roleid: data.roleid,
      usrfullname: data.usrfullname,
      usrdob: data.usrdob,
      usrfaculty: data.usrfaculty,
    })
  }
  const handleAccept = (data) => {
    setShowAccept(true)
    setInfo({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      roleid: data.roleid,
      usrfullname: data.usrfullname,
      usrdob: data.usrdob,
      usrfaculty: data.usrfaculty,
    })
  }
  const handleOnChange = (data, pop) => {
    console.log(data)
    setInfo({ ...infoData, [pop]: data })
  }
  function isDisable() {
    const o = Object.keys(valErrors)
      .filter((k) => valErrors[k] !== null)
      .reduce((a, k) => ({ ...a, [k]: valErrors[k] }), {})
    if (Object.entries(o).length !== 0) return true
    else return false
  }
  const handleOnChangeAdd = (data, pop) => {
    if (data === null || data === undefined || data === "") {
      setValErrors({ ...valErrors, [pop]: 'Không được để trống' })
    } else {
      setValErrors({ ...valErrors, [pop]: null })
    }
    setInfoadd({ ...infoaddData, [pop]: data })
  }

  const columns = [
    {
      name: 'Tên người dùng',
      sortable: true,
      minWidth: '200px',
      selector: row => row.name,
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => row.email,
    },
    {
      name: 'Ngày tạo',
      sortable: true,
      minWidth: '150px',
      selector: row => toDateString(row.joined_at)
    },
    {
      name: 'Trạng thái',
      sortable: true,
      minWidth: '150px',
      cell: (row) => {
        return (
          row.is_active === true ? 'Hoạt động' : 'Xóa '
        )
      }
    },
    {
      name: 'Loại tài khoản',
      sortable: true,
      minWidth: '150px',
      cell: (row) => {
        return (
          row.roleid === 2 ? 'Giáo viên' : row.roleid === 3 ? 'Học viên' : 'Admin'
        )
      }
    },
    {
      name: 'Ngày đăng nhập cuối',
      sortable: true,
      minWidth: '200px',
      selector: row => toDateString(row.last_login)
    },
    {
      name: 'Tác vụ',
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className='d-flex'>
            <Edit size={15} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginLeft: '-18px' }} />
            <Trash size={15} onClick={() => handleDelete(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
            {
              row.is_active === false ? <CheckCircle size={15} onClick={() => handleAccept(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} /> : <></>
            }
          </div>
        )
      }
    }
  ]

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)

    const status = {
      1: { title: 'Admin', color: 'light-primary' },
      2: { title: 'Giáo viên', color: 'light-success' },
      3: { title: 'Học viên', color: 'light-danger' },
    }
    const role = {
      0: { title: 'Professional', color: 'light-success' },
      1: { title: 'Rejected', color: 'light-danger' },
    }
    if (value.length) {
      dispatch(getListUser({
        pageSize: 10,
        pageNumber: currentPage + 1,
        search: value.trim()
      }))
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
    // dispatch(getListUser({
    //   pageSize: 1,
    //   pageNumber: page.selected + 1
    // }))
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={dataUser.totalPages}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4' style={{fontWeight:'bold', color:'#1203b1'}}>DANH SÁCH TÀI KHOẢN</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={() => setShowAdd(true)}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Thêm người dùng</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Tìm kiếm
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={10}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={dataUser.results}
          />
        </div>
      </Card>
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
              <Label className='form-label' for='register-password'>
                Loại tài khoản
              </Label>
              <Input type='select' name='role' id='role' value={infoData.roleid} onChange={(e) => handleOnChange(e.target.value, "roleid")} readOnly={edit}>
                <option value='3'>Học viên</option>
                <option value='2'>Giáo viên</option>
                <option value='1'>Admin</option>
              </Input>
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
                  readOnly: edit
                }
                }
                onChange={date => handleOnChange(toDateStringFormat1(date.toString()), "usrdob")}
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
      <Modal isOpen={showAdd} toggle={() => setShowAdd(!showAdd)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowAdd(!showAdd)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Thêm người dùng</h1>
            <p>Thêm chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='email'>
                Email
              </Label>
              <Input id='email' type='text' autoComplete={false} value={infoaddData.email} onChange={(e) => handleOnChangeAdd(e.target.value, "email")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.email}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='nameUser'>
                Tên người dùng
              </Label>
              <Input id='nameUser' type='text' autoComplete={false} value={infoaddData.name} onChange={(e) => handleOnChangeAdd(e.target.value, "name")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.name}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='password'>
                Mật khẩu
              </Label>
              <Input id='pass' type='password' value={infoaddData.password} onChange={(e) => handleOnChangeAdd(e.target.value, "password")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.password}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfullname'>
                Tên đầy đủ
              </Label>
              <Input id='usrfullname' type='text' value={infoaddData.usrfullname} onChange={(e) => handleOnChangeAdd(e.target.value, "usrfullname")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.usrfullname}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrdob' >
                Ngày sinh
              </Label>
              <Flatpickr
                value={picker}
                options={{
                  dateFormat: "d-M-Y"
                }
                }
                id='date-time-picker'
                className='form-control'
                onChange={date => handleOnChangeAdd(toDateStringFormat1(date.toString()), "usrdob")}
              />
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='register-password'>
                Loại tài khoản
              </Label>
              <Input type='select' name='role' id='role' value={infoaddData.roleid} onChange={(e) => handleOnChangeAdd(e.target.value, "roleid")} readOnly={edit}>
                <option value='3'>Học viên</option>
                <option value='2'>Giáo viên</option>
                <option value='1'>Admin</option>
              </Input>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='usrfaculty'>
                Khoa
              </Label>
              <Input id='usrfaculty' type='text' value={infoaddData.usrfaculty} onChange={(e) => handleOnChangeAdd(e.target.value, "usrfaculty")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.usrfaculty}</p>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={handleAdd} disabled={isDisable()}>
                Thêm mới
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShowAdd(false)}>
                Hủy
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={showAccept} toggle={() => setShowAccept(!showAccept)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowAccept(!showAccept)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Phê duyệt người dùng</h1>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>

            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='button' className='me-1' color='primary' onClick={handleAcceptAccount}>
                Phê duyệt
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShowAccept(false)}>
                Hủy
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={showDelete} toggle={() => setShowDelete(!showDelete)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowDelete(!showDelete)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Xóa  người dùng</h1>
            <p>Bạn có muốn Xóa  tài khoản ngay bây giờ không?</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='reset' className='me-1' color='secondary' onClick={() => setShowDelete(false)}>
                Hủy
              </Button>
              <Button type='submit' color='danger' onClick={handleDelet}>
                Xóa 
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ManageAccount
