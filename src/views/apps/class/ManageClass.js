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
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Edit, Trash, Check, Clipboard } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { getListUser, updateUser, deleteUser, addUser } from '@store/action/profile'
import { getListClass, updateClass, deleteClass, addClass } from '@store/action/classes'
import { toDateStringFormat1, toDateString } from '@utils'
import style from './style.css'
import Flatpickr from 'react-flatpickr'
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

const ManageClass = () => {
  // ** States
  // const [modal, setModal] = useState(false)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [infoData, setInfo] = useState({
  })
  const [listAcc, setListAcc] = useState([])
  const [picker, setPicker] = useState(new Date())
  const [object, setObject] = useState(true)
  const [edit, setEdit] = useState(true)
  const [infoaddData, setInfoadd] = useState({
    classcode: '',
    classname: '',
    classschoolyear: '',
  })
  const [file, setFile] = useState()
  const [valErrors, setValErrors] = useState({
    classcode: '',
    classname: '',
    classschoolyear: '',
  })
  const dataClass = useSelector((state) => {
    return state.classes.dataClass
  })
  useEffect(() => {
    dispatch(getListClass({
      pageNumber: currentPage + 1,
      role: userData.roleid,
      user_id: userData.id
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
      classid: data.classid,
      classcode: data.classcode,
      classname: data.classname,
      classschoolyear: data.classschoolyear,
    })
  }

  const handleUpdate = () => {
    dispatch(updateClass(infoData))
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
    setEdit(true)
    setShowEdit(false)
  }
  const handleAdd = () => {
    dispatch(addClass(infoaddData))
    setShowAdd(false)
    
  }
  const handleDelet = () => {
    dispatch(deleteClass(infoData.classid))
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
      classid: data.classid,
      classcode: data.classcode,
      classname: data.classname,
      classschoolyear: data.classschoolyear,
    })
  }
  const handleDetail = (data) => {
    navigate(`/apps/class/${data.classid}`)
  }
  const handleOnChange = (data, pop) => {
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
  const ExportColum = (role) => {
    if (role === 1) return [
      {
        name: 'Mã lớp',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classcode,
      },
      {
        name: 'Tên lớp',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classname,
      },
      {
        name: 'Năm học',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classschoolyear,
      },
      {
        name: 'Tác vụ',
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className='d-flex'>
              <Edit size={15} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginLeft: '-18px' }} />
              <Trash size={15} onClick={() => handleDelete(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
              <FileText size={15} onClick={() => handleDetail(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
            </div>
          )
        }
      }
    ]
    else return [
      {
        name: 'Mã lớp',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classcode,
      },
      {
        name: 'Tên lớp',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classname,
      },
      {
        name: 'Năm học',
        sortable: true,
        minWidth: '200px',
        selector: row => row.classschoolyear,
      },
      {
        name: 'Tác vụ',
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className='d-flex'>
              <FileText size={15} onClick={() => handleDetail(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
            </div>
          )
        }
      }
    ]
  }
  const columns = [
    {
      name: 'Mã lớp',
      sortable: true,
      minWidth: '200px',
      selector: row => row.classcode,
    },
    {
      name: 'Tên lớp',
      sortable: true,
      minWidth: '200px',
      selector: row => row.classname,
    },
    {
      name: 'Năm học',
      sortable: true,
      minWidth: '200px',
      selector: row => row.classschoolyear,
    },
    {
      name: 'Tác vụ',
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className='d-flex'>
            <Edit size={15} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginLeft: '-18px' }} />
            <Trash size={15} onClick={() => handleDelete(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
            <FileText size={15} onClick={() => handleDetail(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
          </div>
        )
      }
    }
  ]

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = dataClass.results.filter(item => {
        const startsWith =
          item.classcode.toLowerCase().startsWith(value.toLowerCase()) ||
          item.classname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.classschoolyear.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.classcode.toLowerCase().startsWith(value.toLowerCase()) ||
          item.classname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.classschoolyear.toLowerCase().startsWith(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
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
      pageCount={dataClass.totalPages}
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
          <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>DANH SÁCH LỚP HỌC</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            {
              userData.roleid === 1 ? <Button className='ms-2' color='primary' onClick={() => setShowAdd(true)}>
                <Plus size={15} />
                <span className='align-middle ms-50'>Thêm lớp học</span>
              </Button> : <></>
            }

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
            columns={ExportColum(userData.roleid)}
            paginationPerPage={10}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : dataClass.results}
          />
        </div>
      </Card>
      <Modal isOpen={showEdit} toggle={() => setShowEdit(!showEdit)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Sửa thông tin</h1>
            <p>Cập nhật chi tiết</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classname'>
                Tên lớp
              </Label>
              <Input id='classname' type='text' value={infoData.classname} onChange={(e) => handleOnChange(e.target.value, "classname")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classname}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classcode'>
                Mã lớp
              </Label>
              <Input id='classcode' type='text' value={infoData.classcode} onChange={(e) => handleOnChange(e.target.value, "classcode")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classcode}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classschoolyear'>
                Năm học
              </Label>
              <Input id='classschoolyear' type='text' value={infoData.classschoolyear} onChange={(e) => handleOnChange(e.target.value, "classschoolyear")} readOnly={edit} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classschoolyear}</p>
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
            <h1 className='mb-1'>Thêm lớp học</h1>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classname'>
                Tên lớp
              </Label>
              <Input id='classname' type='text' value={infoaddData.classname} onChange={(e) => handleOnChangeAdd(e.target.value, "classname")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classname}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classcode'>
                Mã lớp
              </Label>
              <Input id='classcode' type='text' value={infoaddData.classcode} onChange={(e) => handleOnChangeAdd(e.target.value, "classcode")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classcode}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='classschoolyear'>
                Năm học
              </Label>
              <Input id='classschoolyear' type='text' value={infoaddData.classschoolyear} onChange={(e) => handleOnChangeAdd(e.target.value, "classschoolyear")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.classschoolyear}</p>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={handleAdd} >
                Thêm mới
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShowAdd(false)}>
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
            <h1 className='mb-1'>Xóa lớp</h1>
            <p>Bạn có muốn xóa thông tin ngay bây giờ không?</p>
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

export default ManageClass
