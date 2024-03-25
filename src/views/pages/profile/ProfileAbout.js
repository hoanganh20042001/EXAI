// ** Reactstrap Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { Card, CardBody, CardText, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import { getListUser, updateUser, deleteUser, addUser } from '@store/action/profile'
import { useSelector, useDispatch } from 'react-redux'
import { toDateStringFormat1, toDateString } from '@utils'

const ProfileAbout = ({ data }) => {

  return (
    <Card style={{  margin: 'auto', paddingLeft:'50px', paddingRight:'50px' }}>
      <CardBody >
        {/* <h5 className='mb-75'>Tên tài khoản:</h5>
        <Input value={data.name} readOnly={true} style={{ opacity: '1' }}></Input> */}
        <div className='mt-2'>
          <h5 className='mb-75'>Họ và tên: </h5>
          <Input value={data.usrfullname} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Ngày sinh: </h5>
          <Input value={data.usrdob} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Ngày tạo tài khoản: </h5>
          <Input value={toDateStringFormat1(data.joined_at)} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email: </h5>
          <Input value={data.email} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Khoa: </h5>
          <Input value={data.usrfaculty} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Loại tài khoản: </h5>
          <Input value={data.roleid === 1 ? 'admin' : data.roleid === 2 ? 'giáo viên' : 'học viên'} readOnly={true} style={{ opacity: '1' }}></Input>

        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
