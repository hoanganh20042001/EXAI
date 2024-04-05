// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FileUploaderSingle from './FileUploaderSingle'
import { getListModelBySoftID } from '@store/action/model'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  lastName: '',
  firstName: ''
}

const PersonalInfo = ({ stepper, infoExp, changeInfo }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const [checkbox1, setCheckBox1] = useState(true)
  const [checkbox2, setCheckBox2] = useState(false)
  const [displaySelect, setDisplay] = useState(false)
  const [displayUpload, setDisplayUpload] = useState('none')
  const [display, setDisplayModal] = useState(false)
  const toggleModal = () => setDisplayModal(!display)
  const [displayTur, setDisplayModalTur] = useState(false)
  const toggleModalTur = () => setDisplayModalTur(!displayTur)
  const [infoData, setData] = useState({
    id: 1,
    modelfiletutorial: '',
    modeldescription: '',
    modelname: '',
    modeleventtype: 1,
  })
  // ** Hooks
  const {
    handleSubmit
  } = useForm({ defaultValues })
  const dataModel = useSelector((state) => {
    return state.model.dataModel
  })
  const onSubmit = () => {
    // if (Object.values(data).every(field => field.length > 0)) {
    stepper.next()

  }
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
  const handleSelect = (e) => {
    setData(e.value)
  }
  const ChangeLisModel = (dataDataset) => {
    const list = []
    dataDataset.map(item => {
      list.push({
        value: JSON.stringify({
          id: item.modelid,
          modelfiletutorial: item.modelfiletutorial,
          modeldescription: item.modeldescription,
          modelname: item.modelname,
          modeleventtype: item.modeleventtype,
          default_json_Paramsconfigs: item.default_json_Paramsconfigs
        }),
        label: item.modelname
      })
    })
    return list
  }
  const handleOnChangeData = (value, pop) => {
    const infoModel = JSON.parse(value)
    setData(infoModel)
    changeInfo(infoModel.id, pop)
    changeInfo(infoModel.default_json_Paramsconfigs, 'paramsconfigs_json')
  }
  useEffect(() => {
    dispatch(getListModelBySoftID({
      pageSize: 10,
      page: 1,
      id_softlib: infoExp.expsoftwarelibid
    }))

  }, [dispatch, infoExp.expsoftwarelibid])
  const setModel = (dataModel) => {
    console.log(dataModel)
    console.log(infoExp.expmodelid)
    if (dataModel.length !== 0) {
      const data = dataModel.find(item => item.modelid === infoExp.expmodelid)
      if (data) {
        console.log(data)
        const temp = {
          value: data.modelid,
          label: data.modelname
        }
        return temp
      } else {
        console.log("Không tìm thấy dữ liệu cho modelid:", infoExp.expmodelid)
        return null // hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
      }
    } else {
      console.log("dataModel không có phần tử")
      return null // hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
    }
  }
  return (
    <Fragment>
      <div className='content-header'>

        <Row>
          <Col className='p-0' xl='8'>
            <div className='content-header'>
              <h5 className='mb-0'>Chọn mô hình</h5>
            </div>
          </Col>
        </Row>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='8' className='mb-1'>
            <Select
              isMulti={false}
              isClearable={false}
              theme={selectThemeColors}
              placeholder={'Chọn mô hình'}
              id={`language`}
              options={ChangeLisModel(dataModel)}
              className='react-select'
              classNamePrefix='select'
              value={setModel(dataModel)}
              isDisabled={displaySelect}
              onChange={(e) => handleOnChangeData(e.value, "expmodelid")}
            />
          </Col>
        </Row>
        <Row>
          <Col className='p-0' xl='4' style={{ marginLeft: '15px' }}>
            <h6 className='mb-2'>Thông tin mô hình: {infoData.modelname}</h6>
            <CardText className='mb-25'>Loại: {infoData.modeleventtype}</CardText>
            <CardText className='mb-25' style={{ color: 'blue', cursor: 'pointer' }} onClick={e => setDisplayModal(e)}>Mô tả</CardText>
            <CardText className='mb-25' style={{ color: 'blue', cursor: 'pointer' }} onClick={e => setDisplayModalTur(e)}>Hướng dẫn cấu hình</CardText>
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
      <Modal isOpen={display} toggle={toggleModal} size='lg'>
        <ModalHeader>THÔNG TIN MÔ TẢ</ModalHeader>
        <ModalBody>
          {infoData.modeldescription}
        </ModalBody>
      </Modal>
      <Modal isOpen={displayTur} toggle={toggleModalTur} size='lg'>
        <ModalHeader>Hướng dẫn cấu hình</ModalHeader>
        <ModalBody>
          {infoData.modelfiletutorial}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default PersonalInfo
