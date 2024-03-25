// ** React Imports
// import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { selectThemeColors } from '@utils'
const AddNewModal = ({ open, handleModal }) => {
  // ** State

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ]
  const handleConfirmCancel = () => {
    handleModal()
    return MySwal.fire({
      icon: 'success',
      title: 'Thêm bộ dữ liệu thành công!',
      customClass: {
        confirmButton: 'btn btn-success'
      }
    })
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Thêm bộ dữ liệu mới</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            Tên bộ dữ liệu
          </Label>
          <InputGroup>
            <Input id='full-name' placeholder='Bruce Wayne' />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='post'>
            Loại dữ liệu
          </Label>
          <Select
            isMulti={false}
            isClearable={false}
            theme={selectThemeColors}
            id={`language`}
            options={languageOptions}
            className='react-select'
            classNamePrefix='select'
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
            Số lượng train
          </Label>
          <InputGroup>
            <Input type='number' id='email' />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='salary'>
            Số lượng test
          </Label>
          <InputGroup>
            <Input type='number' id='salary' />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='salary'>
            Chọn file zip bộ dữ liệu
          </Label>
          <InputGroup>
            <Input type='file' id='salary' />
          </InputGroup>
        </div>
        <div className='demo-inline-spacing mb-1'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' defaultChecked />
            <Label className='form-check-label' for='ex1-active'>
              Public
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' />
            <Label className='form-check-label' for='ex1-inactive'>
              Private
            </Label>
          </div>
        </div>
        <Button className='me-1' color='primary' onClick={handleConfirmCancel}>
          Thêm
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
