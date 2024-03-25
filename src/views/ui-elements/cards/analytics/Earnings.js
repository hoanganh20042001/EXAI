// ** Third Party Components
import Chart from 'react-apexcharts'
import axios from 'axios'
import { useState, useEffect } from 'react'
// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

const Earnings = ({ success }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/get-sum-exps/`)
      .then(responsive => {
        const list = []
        const temp = responsive.data.data
        temp.list_sum_by_sortlib.map(item => {
          list.push(item.number)
        })
        setList(list)
      })
  }, [])
  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    labels: ['Nhận diện khuôn mặt', 'Nhận diện hành vi', 'Phát hiện khuôn mặt'],
    stroke: { width: 0 },
    colors: ['#28c76f66', '#28c76f33', success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)}`
              }
            },
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  }

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row>
          <Col xs='12'>
            <CardTitle className='mb-1'>Số bài thí nghiệm</CardTitle>
            {/* <div className='font-small-2'>This Month</div> */}
            {/* <h5 className='mb-1'>$4055.56</h5> */}
            <CardText className='text-muted font-small-2'>
              {/* <span className='fw-bolder'>68.2%</span> */}
              {/* <span> more earnings than last month.</span> */}
            </CardText>
          </Col>
          <Col xs='12'>
            {
              console.log(list)
            }
            {
              list && <Chart options={options} series={list} type='donut' height={320} />
            }
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
