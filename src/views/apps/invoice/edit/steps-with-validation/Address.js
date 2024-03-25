// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { addExp } from '@store/action/experiment'
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

const defaultValues = {
  city: '',
  pincode: '',
  address: '',
  landmark: ''
}

const Address = ({ stepper, infoExp, changeInfo }) => {
  const dispatch = useDispatch()
  
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    dispatch(addExp(infoExp))
    stepper.next()
  }
  const handleOnChange = (value, pop) => {
    changeInfo(value, pop)
  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Cấu hình tham số huấn luyện</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='address'>
              Cấu hình tham số
            </Label>
            <Input type='textarea' placeholder='Cấu hình các tham số' value={infoExp.paramsconfigs_json} onChange={e => handleOnChange(e.target.value, 'paramsconfigs_json')} />

          </Col>
        </Row>

        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Huấn luyện</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
