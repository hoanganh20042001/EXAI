// ** React Imports
import { useContext, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Modal, ModalBody, ModalHeader, Label, Button, Input } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { getListClass, updateClass, deleteClass, addClass } from '@store/action/classes'
import { useSelector, useDispatch } from 'react-redux'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
import axios from 'axios'
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

import { getListUser, updateUser, deleteUser, getInfo } from '@store/action/profile'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const EcommerceDashboard = () => {
  // ** Context
  const dispatch = useDispatch()
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
  const { colors } = useContext(ThemeColors)
  // ** vars
  const trackBgColor = '#e9ecef'
  // const [showRequets, setShowRequest] = useState(dataUser.roleid !== 1 && dataUser.chose_class === false)
  const [idclass, setClass] = useState()
  const handleAdd = () => {
    const url = process.env.REACT_APP_API_URL
    console.log(idclass)
    axios.post(`${url}/request-to-class/`, {
      id_class: idclass
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
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        {/* <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col> */}
        <Col xl='12' md='12' xs='12'>
          <StatsCard cols={{ xl: '4', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='4' md='12'>
          <Earnings success={colors.success.main} />
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
      {/* <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col>
      </Row>
       */}
    </div >
  )
}

export default EcommerceDashboard
