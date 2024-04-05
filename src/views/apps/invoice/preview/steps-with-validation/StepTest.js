// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Table, CardText, Badge } from 'reactstrap'
import FileUploaderSingle from './FileUploaderSingle'
import { getListDataBySoftID } from '@store/action/dataset'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  lastName: '',
  firstName: ''
}

const StepTest = ({ stepper, infoExp, changeInfo, info }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const [statusTrain, setSatus] = useState('waiting')
  const [checkbox1, setCheckBox1] = useState(true)
  const [checkbox2, setCheckBox2] = useState(false)
  const [displaySelect, setDisplay] = useState(false)
  const [displayUpload, setDisplayUpload] = useState('none')
  const [list, setList] = useState([])
  const [train, setTrain] = useState(0)
  const dataDataset = useSelector((state) => {
    return state.dataset.dataDataset
  })
  const [infoModel, setModel] = useState({
    id: 1,
    datasetdescription: '',
    datasetfolderurl: '',
    datasetname: '',
    datasetowner: 1,
    datasetsoftID: 1,
    datasetsum: 1,
    datasettype: 1,
  })
  // ** Hooks
  const {
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = () => {
    console.log(info.configid)
    console.log(infoModel.id)
    // if (Object.values(data).every(field => field.length > 0)) {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/start-test/?id_dataset=${infoModel.id}&id_paramsconfigs=${info.configid}`, {
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      setSatus('testing')
    })

  }
  useEffect(() => {
    dispatch(getListDataBySoftID({
      pageSize: 10,
      page: 1,
      id_softlib: infoExp.expsoftwarelibid
    }))

  }, [dispatch, infoExp.expsoftwarelibid])
  const HandleClick1 = () => {
    setCheckBox1(true)
    setCheckBox2(false)
    setDisplay(false)
    setDisplayUpload('none')
  }
  const HandleClick2 = () => {
    setCheckBox1(false)
    setCheckBox2(true)
    setDisplay(true)
    setDisplayUpload('block')
  }
  const handleOnChangeData = (value, pop) => {
    const infoModel = JSON.parse(value)
    setModel(infoModel)
  }
  const handleTest = () => {

  }
  const ChangeLisData = (dataDataset) => {
    const list = []
    dataDataset.map(item => {
      list.push({
        value: JSON.stringify({
          id: item.datasetid,
          datasetdescription: item.datasetdescription,
          datasetfolderurl: item.datasetfolderurl,
          datasetname: item.datasetname,
          datasetowner: item.datasetowner,
          datasetsoftID: item.datasetsoftID,
          datasetsum: item.datasetsum,
          datasettype: item.datasettype,
        }),
        label: item.datasetname
      })
    })
    return list
  }
  useEffect(() => {
    if (statusTrain === 'testing') {
      const url = process.env.REACT_APP_API_URL
      axios.get(`${url}/experiment/get-test-result/?id_test_result=3`
        , {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },

        }).then(response => {
          setTrain(response.data.resultaccuracy)
          setSatus('waiting')
        })
    }
  }, [statusTrain])
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/get_list_test_results/?id_exp=${infoExp.expid}`).then(response => {
      setList(response.data)
    })
  }, [])
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Chọn bộ dữ liệu test</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='8' className='mb-1'>
            <Select
              isMulti={false}
              isClearable={false}
              theme={selectThemeColors}
              id={`language`}
              options={ChangeLisData(dataDataset)}
              className='react-select'
              classNamePrefix='select'
              isDisabled={displaySelect}
              onChange={(e) => handleOnChangeData(e.value, "expdatasetid")}
            />
          </Col>
        </Row>
        <Row>
          <Col className='p-0' xl='4' style={{ marginLeft: '15px' }}>
            <h6 className='mb-2'>Thông tin bộ dữ liệu: {infoModel.datasetname}</h6>
            <CardText className='mb-25'>Loại: {infoModel.datasettype}</CardText>
            <CardText className='mb-25'>Loại sự kiện: {infoModel.datasettype}</CardText>
            <CardText className='mb-25'>Tổng số lượng mẫu: {infoModel.datasetsum}</CardText>
          </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <h5 className='fw-bold mb-0 me-1'>Accuracy: {train}</h5>
          </Col>
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>Bộ dữ liệu test</th>
              <th>Chuỗi Config</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map(item => {
                return (
                  <tr >
                    <td>{item.resulttestingdataset}</td>
                    <td>{item.resultconfigid}</td>
                    <td>{item.resultaccuracy}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none' >Kiểm tra</span>
          </Button>
          <Button type='button' color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Dự đoán</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default StepTest
