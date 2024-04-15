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
import { toDateString } from '@utils'
import { getListData, updateData, addData, deleteData } from '@store/action/dataset'

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

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const ManageData = () => {
  // ** States
  // const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [infoData, setInfo] = useState({
  })
  const [object, setObject] = useState(true)
  const roleId = JSON.parse(localStorage.getItem('userData'))
  const [infoaddData, setInfoadd] = useState({
    datasetname: '',
    datasettype: 0,
    datasetfolderurl: '',
    datasetsoftID: 1,
    datasetsum: 0,
    datasetdescription: ''
  })
  const [file, setFile] = useState()
  const [valErrors, setValErrors] = useState({
    datasetname: '',
    datasetsum: '',
  })
  const dataDataset = useSelector((state) => {
    return state.dataset.dataDataset
  })
  useEffect(() => {
    dispatch(getListData({
      pageSize: 10,
      page: currentPage + 1
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

  const handleDelete = () => {
    dispatch(deleteData(infoData.datasetid))
    setShowDelete(false)
  }

  const handleUpdate = () => {
    if (infoData.datasetsum !== undefined && infoData.datasetname.trim() !== '') {
      dispatch(updateData(infoData, file))
      setShowEdit(false)
      setValErrors({
        datasetsum: '',
        datasetname: '',
      })
    } else {
      let temp = valErrors
      if (infoData.datasetname.trim() === '' || infoData.datasetname === undefined) { temp = { ...temp, datasetname: 'Không được để trống tên' } } 
      setValErrors(temp)
    }
   
  }
  const handleAdd = () => {
    if (infoaddData.datasetsum !== undefined && infoaddData.datasetname.trim() !== '') {
      dispatch(addData(infoaddData, file))
      setShowAdd(false)
      setValErrors({
        datasetsum: '',
        datasetname: '',
      })
    } else {
      let temp = valErrors
      if (infoaddData.datasetname.trim() === '' || infoaddData.datasetname === undefined) { temp = { ...temp, datasetname: 'Không được để trống tên' } } 
      setValErrors(temp)
    }

    
  }
  const handleDelet = (data) => {
    setInfo({
      datasetid: data.datasetid,
      datasetname: data.datasetname,
      datasettype: data.datasettype,
      datasetfolderurl: data.datasetfolderurl,
      datasetsoftID: data.datasetsoftID,
      datasetsum: data.datasetsum,
      datasetdescription: data.datasetdescription,
    })
    setShowDelete(true)
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
    setFile()
    setInfo({
      datasetid: data.datasetid,
      datasetname: data.datasetname,
      datasettype: data.datasettype,
      datasetfolderurl: data.datasetfolderurl,
      datasetsoftID: data.datasetsoftID,
      datasetsum: data.datasetsum,
    })
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

  const columns = [
    {
      name: 'Tên bộ dữ liệu',
      sortable: true,
      minWidth: '200px',
      selector: row => row.datasetname,
    },
    {
      name: 'Ngày tạo',
      sortable: true,
      minWidth: '100px',
      selector: row => toDateString(row.datasetcreatedtime)
    },
    {
      name: 'Người tạo',
      sortable: true,
      minWidth: '50px',
      selector: row => row.datasetowner
    },
    {
      name: 'Bài toán',
      sortable: true,
      minWidth: '150px',
      cell: (row) => {
        return (
          row.datasetsoftID === 1 ? 'Nhận diện khuôn mặt' : row.datasetsoftID === 2 ? 'Nhận diện hành vi' : 'Phát hiện khuôn mặt'
        )
      }
    },
    {
      name: 'Loại dữ liệu',
      sortable: true,
      minWidth: '150px',
      cell: (row) => {
        return (
          row.datasettype === 0 ? 'Private' : 'Public'
        )
      }
    },

    {
      name: 'Số lượng mẫu',
      sortable: true,
      minWidth: '150px',
      selector: row => row.datasetsum
    },
    {
      name: 'Tác vụ',
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className='d-flex'>
            <Edit size={15} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginLeft: '-18px' }} />
            <Trash size={15} onClick={() => handleDelet(row)} style={{ cursor: 'pointer', marginLeft: '6px' }} />
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
      1: { title: 'Nhận diện khuôn mặt', color: 'light-primary' },
      2: { title: 'Nhận diện hành vi', color: 'light-success' },
      3: { title: 'Phát hiện khuôn mặt', color: 'light-danger' }
    }

    if (value.length) {
      dispatch(getListData({
        pageSize: 10,
        page: currentPage + 1,
        datasetName: value
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
      pageCount={dataDataset.totalPages}
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
          <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>DANH SÁCH BỘ DỮ LIỆU</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            {
               <Button className='ms-2' color='primary' onClick={() => setShowAdd(true)}> <Plus size={15} /> <span className='align-middle ms-50'>Thêm bộ dữ liệu</span> </Button> 
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
            columns={columns}
            paginationPerPage={10}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={dataDataset.results}
          />
        </div>
      </Card>
      <Modal isOpen={showEdit} toggle={() => setShowEdit(!showEdit)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Chỉnh sửa bộ dữ liệu</h1>
            <p>Cập nhật chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetname'>
                Tên bộ dữ liệu <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input id='datasetname' type='text' value={infoData.datasetname} onChange={(e) => handleOnChange(e.target.value, "datasetname")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.datasetname}</p>

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetsum'>
                Số lượng mẫu <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input id='datasetsum' type='number' value={infoData.datasetsum} onChange={(e) => handleOnChange(e.target.value, "datasetsum")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.datasetsum}</p>

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetsoftID'>
                Loại bài toán
              </Label>
              <Input type='select' name='datasetsoftID' id='datasetsoftID' value={infoData.datasetsoftID} onChange={(e) => handleOnChange(e.target.value, "datasetsoftID")}>
                <option value='1'>Nhận diện khuôn mặt</option>
                <option value='2'>Nhận diện hành vi</option>
                <option value='3'>Phát hiện khuôn mặt</option>
              </Input>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetdescription'>
                Mô tả
              </Label>
              <Input id='datasetdescription' type='textarea' value={infoData.datasetdescription} onChange={(e) => handleOnChange(e.target.value, "datasetdescription")} />

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='salary' >
                Chọn file zip bộ dữ liệu 
              </Label>
              <Input type='file' id='salary' onChange={(e) => setFile(e.target.files[0])} />
            </Col>
            <Col md={12} xs={12}>
              {roleId.roleid === 2 && (
                <div className='demo-inline-spacing mb-1'>
                  <div className='form-check'>
                    <Input
                      type='radio'
                      id='ex1-active'
                      name='ex1'
                      checked={infoData.datasettype === 1}
                      onClick={(e) => handleOnChange(1, "datasettype")}
                    />
                    <Label className='form-check-label' for='ex1-active'>
                      Public
                    </Label>
                  </div>
                  <div className='form-check'>
                    <Input
                      type='radio'
                      name='ex1'
                      id='ex1-inactive'
                      checked={infoData.datasettype === 0}
                      onClick={(e) => handleOnChange(0, "datasettype")}
                    />
                    <Label className='form-check-label' for='ex1-inactive'>
                      Private
                    </Label>
                  </div>
                </div>
              )}
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={handleUpdate}>
                Cập nhật
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShowEdit(false)}>
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
            <h1 className='mb-1'>Thêm bộ dữ liệu</h1>
            <p>Thêm chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetname'>
                Tên bộ dữ liệu <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input id='datasetname' type='text' value={infoaddData.datasetname} onChange={(e) => handleOnChangeAdd(e.target.value, "datasetname")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.datasetname}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetsum'>
                Số lượng mẫu <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input id='datasetsum' type='number' value={infoaddData.datasetsum} onChange={(e) => handleOnChangeAdd(e.target.value, "datasetsum")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.datasetsum}</p>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetsoftID'>
                Loại bài toán
              </Label>
              <Input type='select' name='datasetsoftID' id='datasetsoftID' value={infoaddData.datasetsoftID} onChange={(e) => handleOnChangeAdd(e.target.value, "datasetsoftID")}>
                <option value='1'>Nhận diện khuôn mặt</option>
                <option value='2'>Nhận diện hành vi</option>
                <option value='3'>Phát hiện khuôn mặt</option>
              </Input>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='datasetdescription'>
                Mô tả
              </Label>
              <Input id='datasetdescription' type='textarea' value={infoaddData.datasetdescription} onChange={(e) => handleOnChangeAdd(e.target.value, "datasetdescription")} />
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='salary' >
                Chọn file zip bộ dữ liệu 
              </Label>
              <Input type='file' id='salary' onChange={(e) => setFile(e.target.files[0])} />
            </Col>
            <Col md={12} xs={12}>
              <div className='demo-inline-spacing mb-1'>
                <div className='form-check'>
                  <Input type='radio' id='ex1-active' name='ex1' checked={infoaddData.datasettype === 1} onClick={(e) => handleOnChangeAdd(1, "datasettype")} />
                  <Label className='form-check-label' for='ex1-active'>
                    Public
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex1' id='ex1-inactive' checked={infoaddData.datasettype === 0} onClick={(e) => handleOnChangeAdd(0, "datasettype")} />
                  <Label className='form-check-label' for='ex1-inactive'>
                    Private
                  </Label>
                </div>
              </div>
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
      <Modal isOpen={showDelete} toggle={() => setShowDelete(!showDelete)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowDelete(!showDelete)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Xóa bộ dữ liệu</h1>
            <p>Bạn có muốn xóa thông tin ngay bây giờ không?</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='reset' className='me-1' color='secondary' onClick={() => setShowDelete(false)}>
                Hủy
              </Button>
              <Button type='submit' color='danger' onClick={handleDelete}>
                Xóa
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ManageData
