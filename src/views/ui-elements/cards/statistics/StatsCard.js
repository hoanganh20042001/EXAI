// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { useState, useEffect } from 'react'
import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const [data, setData] = useState()
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/thongke-role/`).then(
      res => {
        const temp = res.data
        console.log(temp)
        setData([
          {
            title: temp.admin,
            subtitle: 'Số admin',
            color: 'light-primary',
            icon: <TrendingUp size={24} />
          },
          {
            title: temp.hocvien,
            subtitle: 'Số học viên',
            color: 'light-info',
            icon: <User size={24} />
          },
          {
            title: temp.giaovien,
            subtitle: 'Số giáo viên',
            color: 'light-danger',
            icon: <Box size={24} />
          }
          // {
          //   title: '$9745',
          //   subtitle: 'Revenue',
          //   color: 'light-success',
          //   icon: <DollarSign size={24} />
          // }
        ])
      }
    )
  }, [])

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Thống kê</CardTitle>
        {/* <CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText> */}
      </CardHeader>
      <CardBody className='statistics-body'>
        {
          data && <Row>{renderData()}</Row>
        }
        
      </CardBody>
    </Card>
  )
}

export default StatsCard
