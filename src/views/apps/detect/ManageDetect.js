// import { Link, } from 'react-router-dom'
import { Fragment, useState, forwardRef, useEffect } from 'react'

import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import Select from 'react-select'
// ** Table Data & Columns
// import { data } from './list/data'
import { selectThemeColors } from '@utils'
import { Controller, useForm } from 'react-hook-form'
import Avatar from '@components/avatar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Eye, ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Edit, Trash, Check, Clipboard, Search, MoreVertical } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
// import { toDateString } from '@utils'
// import { getListFace, searchFace, updateFace, addFace, deleteFace } from '@store/action/face'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

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
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalHeader, ModalFooter,
  Badge
} from 'reactstrap'
import { useAbility } from '@casl/react'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const ManageDetect = () => {
  // ** States
  // const [modal, setModal] = useState(false)
  const [displaySelect, setDisplay] = useState(false)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [score, setScore] = useState(0.9)
  const [filteredData, setFilteredData] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [infoData, setInfo] = useState({
  })
  const [object, setObject] = useState(true)
  const roleId = JSON.parse(localStorage.getItem('userData'))
  const [infoaddData, setInfoadd] = useState({
    name: ''
  })
  const [file, setFile] = useState()
  const [valErrors, setValErrors] = useState({
    datasetname: '',
    datasetsum: '',
    datasetdescription: ''
  })
  const dataFace = useSelector((state) => {
    return state.face.dataFace
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const handleDelete = () => {
    setShowDelete(false)
  }

  const handleUpdate = () => {
    dispatch(updateFace(infoData))
    setShowEdit(false)
  }
  const handleAdd = () => {
    dispatch(addFace(infoaddData, file))
    setShowAdd(false)
  }
  const handleDelet = (data) => {
    dispatch(deleteFace(data.Face_id))
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
  const languageOptions = [
    { value: 1, label: '0.25' },
    { value: 2, label: '0.5' },
    { value: 3, label: '0.75' },
  ]
  const handleEdit = (data) => {
    setShowEdit(true)
    setFile()
    setInfo({
      Face_id: data.Face_id,
      name: data.name,
      creatorID: data.creatorID
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
      name: 'Ảnh',
      sortable: true,
      minWidth: '200px',
      selector: (row) => {
        const url = process.env.REACT_APP_API_URL
        return (
          <div>
            <img src={`${row.url}`} style={{ width: '100px' }}></img>
          </div>
        )
      },
    },
    {
      name: 'Đối tượng',
      sortable: true,
      minWidth: '200px',
      selector: (row) => {
        const url = process.env.REACT_APP_API_URL
        return (
          row.arr_face.map(item => {
            return (
              <p>{item.name}</p>
            )
          })
        )
      },
    }
  ]

  // ** Function to handle filter
  const handleFilter = e => {
    dispatch(searchFace(
      {
        url: searchValue,
        score: score
      }
    ))
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
      pageCount={dataFace.totalPages}
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
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' >
          {/* <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>Tìm kiếm</CardTitle> */}
          <Row className='gy-1'style={{height:'10px'}}>
          <StatsHorizontal  icon={<UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link}
                // to={`/apps/invoice/preview/${item.expid}`}
                className='w-100'>
                <Eye size={14} className='me-50' />
                <span className='align-middle'>Xem chi tiết</span>
              </DropdownItem>
              {
                roleId.roleid === 3 ? <DropdownItem tag={Link}
                  //  to={`/apps/invoice/edit/${item.expid}`}
                  className='w-100'>
                  <Edit size={14} className='me-50' />
                  <span className='align-middle'>Thí nghiệm lại</span>
                </DropdownItem> : <></>
              }

              <DropdownItem
                className='w-100'
              // onClick={e => handleDelete(item.expid)}
              >
                <Trash size={14} className='me-50' />
                <span className='align-middle'>Xóa</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>} color='primary' />
          </Row>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={() => handleFilter()}><Search size={15} /> <span className='align-middle ms-50'>Tìm kiếm</span> </Button> : <></>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Nhập link tìm kiếm
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </Col>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Độ chính xác
            </Label>
            <Select
              isMulti={false}
              isClearable={false}
              placeholder={'Độ chính xác'}
              theme={selectThemeColors}
              id={`language`}
              options={languageOptions}
              className='react-select'
              classNamePrefix='select'
              isDisabled={displaySelect}
            // onChange={(e) => handleOnChange(e.value, "expsoftwarelibid")}
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
            data={dataFace.data}
            customStyles={{
              rows: {
                style: {
                  minHeight: '150px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }
            }}
          />
        </div>
      </Card>
      <Modal isOpen={showEdit} toggle={() => setShowEdit(!showEdit)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Chỉnh sửa đối tượng</h1>
            <p>Cập nhật chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='name'>
                Tên đối tượng
              </Label>
              <Input id='name' type='text' value={infoData.name} onChange={(e) => handleOnChange(e.target.value, "name")} />
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={e => handleUpdate()}>
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
            <h1 className='mb-1'>Thêm đối tượng</h1>
            <p>Thêm chi tiết thông tin</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12} xs={12}>
              <Label className='form-label' for='name'>
                Tên đối tượng
              </Label>
              <Input id='name' type='text' value={infoaddData.datasetname} onChange={(e) => handleOnChangeAdd(e.target.value, "name")} />
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'red' }}>{valErrors.datasetname}</p>
            </Col>

            <Col md={12} xs={12}>
              <Label className='form-label' for='salary' >
                Chọn ảnh
              </Label>
              <Input type='file' id='salary' onChange={(e) => setFile(e.target.files[0])} />
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={handleAdd}>
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
            <h1 className='mb-1'>Xóa đối tượng</h1>
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

export default ManageDetect
