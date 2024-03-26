// ** Third Party Components
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Button } from 'reactstrap'
import { ArrowLeft, ArrowRight, AlertCircle } from 'react-feather'

const ChartjsLineChart = ({ labelColor, gridLineColor, lineChartDanger, stepper }) => {
  const dispatch = useDispatch()
  const dataExp = useSelector((state) => {
    return state.experiment.dataExp
  })
  // ** Chart Options
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'top',
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  // ** Chart Data
  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Europe',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: lineChartDanger,
        pointBorderColor: 'transparent',
        backgroundColor: lineChartDanger,
        pointHoverBackgroundColor: lineChartDanger
      }
    ]
  }

  //** To add spacing between legends and chart
  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20
        }
      }
    }
  ]

  return (
    <Card>
      {console.log(dataExp)}
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Statistics
          </CardTitle>
          <CardSubtitle>Commercial networks and enterprises</CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '450px' }}>
          <Line data={data} options={options} height={450} plugins={plugins} />
        </div>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Cấu hình lại</span>
          </Button>
          <Button type='button' color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Đánh giá</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsLineChart
