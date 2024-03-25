import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FileUploaderSingle from './FileUploaderSingle'
import { getListDataBySoftID } from '@store/action/dataset'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { data } from 'jquery'

const defaultValues = {
  lastName: '',
  firstName: ''
}

const AccountDetails = ({ stepper, infoExp, changeInfo }) => {
  const dispatch = useDispatch()
  const [checkbox1, setCheckBox1] = useState(true)
  const [checkbox2, setCheckBox2] = useState(false)
  const [displaySelect, setDisplay] = useState(infoExp.expstatus !== 1)
  const [displayUpload, setDisplayUpload] = useState('none')
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
  const [display, setDisplayModal] = useState(false)
  const toggleModal = () => setDisplayModal(!display)
  // ** Hooks
  const {
    handleSubmit
  } = useForm({ defaultValues })
  const dataDataset = useSelector((state) => {
    return state.dataset.dataDataset
  })
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
    dispatch(getListDataBySoftID({
      pageSize: 10,
      page: 1,
      id_softlib: infoExp.expsoftwarelibid
    }))

  }, [dispatch, infoExp.expsoftwarelibid])
  const setData = (dataDataset) => {
    if (dataDataset.length !== 0) {
      const data = dataDataset.find(item => item.datasetid === infoExp.expdatasetid)
      console.log(dataDataset)
      const temp = {
        value: dataDataset.datasetid,
        label: dataDataset.datasetname
      }
      return temp
    }

  }
  const onSubmit = () => {
    // if (Object.values(data).every(field => field.length > 0)) {
    stepper.next()

  }
  const handleOnChange = (value, pop) => {
    changeInfo(value, pop)
  }
  const handleOnChangeData = (value, pop) => {
    const infoModel = JSON.parse(value)
    setModel(infoModel)
    changeInfo(infoModel.id, pop)
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
    setModel(e.value)
  }
  const languageOptions = [
    { value: 1, label: 'Nhận diện khuôn mặt' },
    { value: 2, label: 'Nhận diện hành vi' },
    { value: 3, label: 'Phát hiện khuôn mặt' },
  ]
  return (
    <Fragment>

      <div>
        <Row>
          <Col className='p-0' xl='8'>
            <div className='content-header'>
              <h5 className='mb-0'>Chọn bộ dữ liệu</h5>
            </div>
          </Col>
        </Row>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='city'>
              Tên bài thí nghiệm
            </Label><Input placeholder='Tên bài thí nghiệm' value={infoExp.expname} onChange={e => handleOnChange(e.target.value, 'expname')} readOnly={displaySelect} />
          </Col>

        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <Select
              isMulti={false}
              isClearable={false}
              placeholder={'Chọn bài toán'}
              theme={selectThemeColors}
              id={`language`}
              options={languageOptions}
              value={{ value: infoExp.expsoftwarelibid, label: infoExp.expsoftwarelibid === 1 ? 'Nhận diện khuôn mặt' : infoExp.expsoftwarelibid === 2 ? 'Nhận diện hành vi' : 'Phát hiện khuôn mặt' }}
              className='react-select'
              classNamePrefix='select'
              isDisabled={displaySelect}
              onChange={(e) => handleOnChange(e.value, "expsoftwarelibid")}
            />
          </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <Select
              isMulti={false}
              isClearable={false}
              theme={selectThemeColors}
              placeholder={'Chọn bộ dữ liệu'}
              id={`language`}
              options={ChangeLisData(dataDataset)}
              className='react-select'
              classNamePrefix='select'
              isDisabled={displaySelect}
              value={setData(dataDataset)}
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
            <CardText className='mb-25' style={{ color: 'blue', cursor: 'pointer' }} onClick={e => setDisplayModal(e)}>Mô tả</CardText>
          </Col>
        </Row>
        <div className='d-flex justify-content-end'>

          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
      <Modal isOpen={display} toggle={toggleModal} size='lg'>
        <ModalHeader>THÔNG TIN MÔ TẢ</ModalHeader>
        <ModalBody>
          {infoModel.datasetdescription}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AccountDetails
