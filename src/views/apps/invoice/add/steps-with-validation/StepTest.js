// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Badge } from 'reactstrap'
import FileUploaderSingle from './FileUploaderSingle'
import { getListDataBySoftID } from '@store/action/dataset'
import axios from 'axios'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  lastName: '',
  firstName: ''
}

const StepTest = ({ stepper, infoExp, changeInfo }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const [statusTrain, setSatus] = useState('waiting')
  const [checkbox1, setCheckBox1] = useState(true)
  const [checkbox2, setCheckBox2] = useState(false)
  const [displaySelect, setDisplay] = useState(false)
  const [displayUpload, setDisplayUpload] = useState('none')
  const [train, setTrain] = useState(0)
  const dataDataset = useSelector((state) => {
    return state.dataset.dataDataset
  })
  // ** Hooks
  const {
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = () => {
    // if (Object.values(data).every(field => field.length > 0)) {
    stepper.next()

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
            />
          </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <h5 className='fw-bold mb-0 me-1'>Accuracy: {train}</h5>
          </Col>
        </Row>

        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='button' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none' onClick={(e) => setSatus('testing')}>Kiểm tra</span>
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
