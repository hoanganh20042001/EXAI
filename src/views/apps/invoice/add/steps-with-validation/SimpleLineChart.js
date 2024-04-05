// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Button, Badge } from 'reactstrap'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Third Party Components
import { ArrowLeft, ArrowRight, AlertCircle, ArrowDown, ArrowUp } from 'react-feather'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { config } from '@fullcalendar/core'
// ** Chart Data
const RenderChart = ({ listTrain }) => {
  return (
    <Chart
      type="area"
      height={300}
      width='100%'
      series={[
        {
          name: "Accuracy",
          data: listTrain?.map(data => data.accuracy)
        },
        {
          name: "Loss value",
          data: listTrain?.map(data => data.lossvalue)
        }
      ]}
      options={{
        chart: {
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },

        colors: ['#0004f9', '#f70000'],
        stroke: { width: 1, curve: 'smooth' },
        dataLabels: { enabled: false },
        xaxis: {
          type: 'numeric',
          title: {
            text: 'iteration',
          },
          categories: listTrain?.map(data => data.epoch),
          title: 'epoch',
          labels: {
            hideOverlappingLabels: true,
          }

        },
        yaxis: {
          show: false,
        }
      }}
    />
  )
}

const SimpleLineChart = ({ warning, stepper }) => {
  const {
    handleSubmit
  } = useForm({})
  const dispatch = useDispatch()
  const dataExp = useSelector((state) => {
    return state.experiment.dataExp
  })
  const onSubmit = () => {
    // if (Object.values(data).every(field => field.length > 0)) {
    stepper.next()
  }
  const [statusTrain, setSatus] = useState('training')
  const [disable, setDisable] = useState(true)
  const [pre, setPre] = useState(true)
  const [next, setNext] = useState(true)
  const [stopTrain, setStop] = useState(true)
  const [listTrain, setListTrain] = useState([])
  const [pretrain, setPreTrain] = useState({
    accuracy: 0,
    lossvalue: 0
  }
  )
  const [train, setTrain] = useState({
    accuracy: 0,
    lossvalue: 0
  }
  )
  const [counter, setCounter] = useState(0)
  const handleStop = () => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/stop-train/?id_paramsconfigs=${dataExp.configid}`).then(
      res => {
        setCounter(100)
        setStop(true)
        setNext(true)
        setPre(false)
        setSatus('stop')
      }
    )
  }
  const setColor = (color) => {
    switch (color) {
      case 'training': return 'warning'
      case 'done': return 'success'
      case 'stop': return 'danger'
    }
  }
  const setLabel = (label) => {
    switch (label) {
      case 'training': return 'Đang huấn luyện'
      case 'done': return 'Thành công'
      case 'stop': return 'Đã dừng'
    }
  }
  // ** Chart Series


  useEffect(() => {
    if (counter < 100 && statusTrain === 'training' && dataExp.configid !== undefined) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1)
        const url = process.env.REACT_APP_API_URL
        console.log(dataExp)
        axios.get(`${url}/experiment/get-new-traning-result/?id_paramsconfigs=${dataExp.configid}&pre_result_index=0`
          , {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },

          }).then(response => {
            console.log(response.data)
            const list = listTrain
            const data = response.data.data.result
            const obj = {
              time: moment(new Date()).format('HH:mm:ss'),
              accuracy: response.data.accuracy,
              lossvalue: response.data.lossvalue
            }
            if (response.data.data.status === 0) {
              setSatus('done')
              setStop(true)
              setNext(false)
              setPre(true)
            } else {
              setStop(false)
            }
            data.map(item => {
              setPreTrain(train)
              setTrain(item)
              list.push({
                accuracy: item.accuracy,
                lossvalue: item.lossvalue,
                epoch: item.trainresultindex
              })
            })
            setListTrain(list)

          })

      }, 1000)
      return () => clearInterval(interval)
    } else if (statusTrain === 'training') {
      setStop(false)
    }
  }, [counter, dataExp, statusTrain])
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <div className='d-flex align-items-center flex-wrap mt-sm-0 mt-1'>
            {train &&
              <>
                <h5 className='fw-bold mb-0 me-1'>Accuracy: </h5>
                <Badge className='badge-md' color='light-secondary'>
                  {
                    train.accuracy >= pretrain.accuracy ? <ArrowUp className='text-success me-50' size={15} /> : <ArrowDown className='text-danger me-50' size={15} />
                  }
                  {train.accuracy}
                </Badge>
                <h5 className='fw-bold mb-0 me-1'>Loss value: </h5>
                <Badge className='badge-md' color='light-secondary'>
                  {
                    train.lossvalue >= pretrain.lossvalue ? <ArrowUp className='text-success me-50' size={15} /> : <ArrowDown className='text-danger me-50' size={15} />
                  }
                  {train.lossvalue}
                </Badge>
                <h5 className='fw-bold mb-0 me-1'>Trạng thái: </h5>
                <Badge className='badge-md' color={setColor(statusTrain)}>
                  {setLabel(statusTrain)}
                </Badge>
              </>
            }

          </div>
        </CardHeader>

        <CardBody>
          <div className='recharts-wrapper'>
            <RenderChart listTrain={listTrain}></RenderChart>
          </div>
          <div className='d-flex justify-content-between'>
            <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()} disabled={pre}>
              <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
              <span className='align-middle d-sm-inline-block d-none'>Cấu hình lại</span>
            </Button>
            <Button type='button' color='danger' className='btn-next' onClick={handleStop} disabled={stopTrain}>
              <span className='align-middle d-sm-inline-block d-none'>Dừng huấn luyện</span>
              <AlertCircle size={14} className='align-middle ms-sm-25 ms-0'></AlertCircle>
            </Button>
            <Button type='submit' color='primary' className='btn-next' disabled={next}>
              <span className='align-middle d-sm-inline-block d-none'>Đánh giá</span>
              <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Form>

  )
}
export default SimpleLineChart
