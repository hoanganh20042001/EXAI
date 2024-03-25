// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const RevenueReport = props => {
  // ** State
  const [data, setData] = useState(null)
  const [revenueOptions, setOption] = useState({})
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/draw-exp-chart/`).then(res => {
      const list = []
      const cate = []
      const temp = res.data.data
      temp.list_result.map(item => {
        list.push(item.count_exp)
        cate.push(item.time)
      })
      setData(list)
      setOption({
        chart: {
          stacked: true,
          type: 'bar',
          toolbar: { show: false }
        },
        grid: {
          padding: {
            top: -20,
            bottom: -10
          },
          yaxis: {
            lines: { show: false }
          }
        },
        xaxis: {
          categories: cate,
          labels: {
            hideOverlappingLabels: true,
            style: {
              colors: '#b9b9c3',
              fontSize: '0.86rem'
            },
            
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        colors: [props.primary, props.warning],
        plotOptions: {
          bar: {
            columnWidth: '17%',
            borderRadius: [5]
          },
          distributed: true
        },
        yaxis: {
          labels: {
            style: {
              colors: '#b9b9c3',
              fontSize: '0.86rem'
            }
          }
        }
      },)
    })
  }, [])


  return data !== null ? (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='12' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>Thống kê số bài thí nghiệm</CardTitle>
          </div>
          {
            data && <Chart id='revenue-report-chart' height='230' options={revenueOptions} series={[
              {
                name: 'Earning',
                data: data
              }
            ]} />
          }
  
        </Col>
      </Row>
    </Card>
  ) : null
}

export default RevenueReport
