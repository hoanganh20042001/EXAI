// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
// import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
// import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal, ModalBody, ModalHeader, CardTitle, CardHeader } from 'reactstrap'

import { getListExp, deleteExp, searchListExp } from '@store/action/experiment'
// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { toDateString } from '@utils'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Icons Imports
import {
  Eye,
  Cpu,
  Heart,
  Award,
  Truck,
  Server,
  Activity,
  ShoppingBag,
  AlertOctagon,
  Edit,
  Trash,
  MoreVertical
} from 'react-feather'
const roleId = JSON.parse(localStorage.getItem('userData'))
const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='3' className='d-flex align-items-center px-0 px-lg-1'>
          <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>BÀI THÍ NGHIỆM</CardTitle>
        </Col>

      </Row>
      <Row>
      <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          {
            roleId.roleid === 3 ? <Button tag={Link} to='/apps/invoice/add' color='primary'>
              Thêm bài thí nghiệm
            </Button> : <></>
          }

        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Tìm kiếm</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Tìm kiếm bài thí nghiệm'
            />
          </div>
          <Input className='w-auto ' type='select' value={statusValue} onChange={e => handleStatusValue(e.target.value)}>
            <option value=''>Tất cả</option>
            <option value='1'>Nhận diện khuôn mặt</option>
            <option value='2'>Nhận diện hành vi</option>
            <option value='3'>Phát hiện khuôn mặt</option>
          </Input>
        </Col>
      </Row>
    </div>
  )
}

const InvoiceList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const dataExp = useSelector((state) => {
    return state.experiment.dataExp
  })
  const navigate = useNavigate()
  // ** States
  const [value, setValue] = useState('')
  // const [sort, setSort] = useState('desc')
  // const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(0)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(16)
  const [showDelete, setShowDelete] = useState(false)
  const [infoData, setInfo] = useState()
  const sort = 'desc'
  const sortColumn = 'id'
  useEffect(() => {
    dispatch(
      getListExp({
        page: currentPage + 1,
        pageZie: rowsPerPage
      })
    )
  }, [dispatch, currentPage])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      searchListExp({
        page: currentPage + 1,
        pageSize: rowsPerPage,
        keyword: val,
        id_softlib: statusValue
      })
    )
  }
  const handleDelete = (data) => {
    setShowDelete(true)
    setInfo(data)
  }
  const handleDelet = () => {
    dispatch(deleteExp(infoData))
    setShowDelete(false)
    navigate('/apps/invoice/list')
  }
  const handlePerPage = e => {
    dispatch(getListExp({
      page: currentPage + 1,
      pageZie: parseInt(e.target.value)
    }))
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = val => {
    setStatusValue(val)
    dispatch(
      searchListExp({
        page: currentPage + 1,
        pageSize: rowsPerPage,
        keyword: value,
        id_softlib: val
      })
    )
  }

  const handlePageClick = page => {
    dispatch(getListExp({
      page: page.selected + 1,
      pageZie: rowsPerPage
    }))
    setCurrentPage(page.selected)
  }

  // const dataToRender = () => {
  //   const filters = {
  //     q: value,
  //     status: statusValue
  //   }

  //   const isFiltered = Object.keys(filters).some(function (k) {
  //     return filters[k].length > 0
  //   })

  //   if (store.data.length > 0) {
  //     return store.data
  //   } else if (store.data.length === 0 && isFiltered) {
  //     return []
  //   } else {
  //     return store.allData.slice(0, rowsPerPage)
  //   }
  // }

  // const handleSort = (column, sortDirection) => {
  //   setSort(sortDirection)
  //   setSortColumn(column.sortField)
  //   dispatch(
  //     getData({
  //       q: value,
  //       page: currentPage,
  //       sort: sortDirection,
  //       status: statusValue,
  //       perPage: rowsPerPage,
  //       sortColumn: column.sortField
  //     })
  //   )
  // }

  return (
    <div className='invoice-list-wrapper'>
      {/* <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card> */}
      <CustomHeader
        value={value}
        statusValue={statusValue}
        rowsPerPage={rowsPerPage}
        handleFilter={handleFilter}
        handlePerPage={handlePerPage}
        handleStatusValue={handleStatusValue}
      />
      <Row>
        {/* Stats With Icons Horizontal */}
        {
          dataExp.results && dataExp.results.map(item => {
            return (
              <Col lg='3' sm='6'>
                <StatsHorizontal icon={<UncontrolledDropdown>
                  <DropdownToggle tag='span'>
                    <MoreVertical size={17} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem tag={Link} to={`/apps/invoice/preview/${item.expid}`} className='w-100'>
                      <Eye size={14} className='me-50' />
                      <span className='align-middle'>Xem chi tiết</span>
                    </DropdownItem>
                    {
                      roleId.roleid === 3 ? <DropdownItem tag={Link} to={`/apps/invoice/edit/${item.expid}`} className='w-100'>
                        <Edit size={14} className='me-50' />
                        <span className='align-middle'>Thí nghiệm lại</span>
                      </DropdownItem> : <></>
                    }

                    <DropdownItem
                      className='w-100'
                      onClick={e => handleDelete(item.expid)}
                    >
                      <Trash size={14} className='me-50' />
                      <span className='align-middle'>Xóa</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>} color='primary' stats={item.expname} statTitle1={toDateString(item.expcreatedtime)} statTitle2={item.expsoftwarelibid === 1 ? 'Nhận diện khuôn mặt' : item.expsoftwarelibid === 2 ? 'Nhận diện hành động' : 'Phát hiện khuôn mặt'} />
              </Col>
            )
          })
        }

      </Row>
      {
        dataExp.totalPages &&
        <ReactPaginate
          previousLabel=''
          nextLabel=''
          forcePage={currentPage}
          onPageChange={page => handlePageClick(page)}
          pageCount={dataExp.totalPages}
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
      }

      <Modal isOpen={showDelete} toggle={() => setShowDelete(!showDelete)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowDelete(!showDelete)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Xóa bài thí nghiệm</h1>
            <p>Bạn có muốn bài thí nghiệm ngay bây giờ không?</p>
          </div>
          <Row className='gy-1 pt-75'>
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
    </div>
  )
}

export default InvoiceList
