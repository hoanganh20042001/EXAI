// ** React Imports
import { useState } from 'react'
// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Utils
import { isUserLoggedIn } from '@utils'
import { Link, useNavigate } from 'react-router-dom'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { ChevronLeft, X, Check } from 'react-feather'
import axios from 'axios'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import Avatar from '@components/avatar'
import { toast } from 'react-hot-toast'
const ForgotPassword = () => {
  // ** Hooks
  const navigate = useNavigate()

  const { skin } = useSkin()
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmpass, setConfirm] = useState('')
  const [token, setToken] = useState('')
  const [sendMail, setSenMail] = useState(true)
  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const handleSendMail = () => {
    const url = process.env.REACT_APP_API_URL
    axios.post(`${url}/api/password_reset/`, {
      email: mail
    }, {
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      setSenMail(false)
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Nhập mật khẩu mới!</h6>
          </div>
        </div>
      )
    }).catch(err => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Có lỗi xảy ra!</h6>
          </div>
        </div>
      )
    })

  }
  const handleResset = () => {
    const url = process.env.REACT_APP_API_URL
    axios.post(`${url}/api/password_reset/confirm`, {
      password: pass,
      token: token
    }, {
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      setSenMail(true)
      navigate('/login')
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Đổi mật khẩu thành công!</h6>
          </div>
        </div>
      )
    }).catch(err => {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Có lỗi xảy ra!</h6>
          </div>
        </div>
      )
    })

  }
  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-cover'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <svg viewBox='0 0 139 95' version='1.1' height='28'>
              <defs>
                <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                  <stop stopColor='#000000' offset='0%'></stop>
                  <stop stopColor='#FFFFFF' offset='100%'></stop>
                </linearGradient>
                <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                  <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                  <stop stopColor='#FFFFFF' offset='100%'></stop>
                </linearGradient>
              </defs>
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                  <g id='Group' transform='translate(400.000000, 178.000000)'>
                    <path
                      d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                      id='Path'
                      className='text-primary'
                      style={{ fill: 'currentColor' }}
                    ></path>
                    <path
                      d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                      id='Path'
                      fill='url(#linearGradient-1)'
                      opacity='0.2'
                    ></path>
                    <polygon
                      id='Path-2'
                      fill='#000000'
                      opacity='0.049999997'
                      points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                    ></polygon>
                    <polygon
                      id='Path-2'
                      fill='#000000'
                      opacity='0.099999994'
                      points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                    ></polygon>
                    <polygon
                      id='Path-3'
                      fill='url(#linearGradient-2)'
                      opacity='0.099999994'
                      points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                    ></polygon>
                  </g>
                </g>
              </g>
            </svg>
            <h2 className='brand-text text-primary ms-1'>Vuexy</h2>
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login Cover' />
            </div>
          </Col>
          {
            sendMail === true ? <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
              <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                <CardTitle tag='h2' className='fw-bold mb-1'>
                  Quên mật khẩu? 🔒
                </CardTitle>
                <CardText className='mb-2'>
                  Nhập email để nhận lại mật khẩu
                </CardText>
                <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
                  <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                      Email
                    </Label>
                    <Input type='email' id='login-email' placeholder='' autoFocus value={mail} onChange={e => setMail(e.target.value)} />
                  </div>
                  <Button color='primary' block onClick={e => handleSendMail(e)}>
                    Gửi mail
                  </Button>
                </Form>
                <p className='text-center mt-2'>
                  <Link to='/login'>
                    <ChevronLeft className='rotate-rtl me-25' size={14} />
                    <span className='align-middle'>Đăng nhập</span>
                  </Link>
                </p>
              </Col>
            </Col> : <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
              <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                <CardTitle tag='h2' className='fw-bold mb-1'>
                  Quên mật khẩu? 🔒
                </CardTitle>
                <CardText className='mb-2'>
                  Nhập mật khẩu mới
                </CardText>
                <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
                  <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                      Mã xác nhận
                    </Label>
                    <Input type='text' id='login-email' placeholder='' autoFocus value={token} onChange={e => setToken(e.target.value)} />
                  </div>
                  <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                      Mật khẩu mới
                    </Label>
                    <Input type='password' id='login-email' placeholder='' autoFocus value={pass} onChange={e => setPass(e.target.value)} />
                  </div>
                  <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                      Xác nhận mật khẩu mới
                    </Label>
                    <Input type='password' id='login-email' placeholder='' autoFocus value={confirmpass} onChange={e => setConfirm(e.target.value)} />
                    {
                      confirmpass.length !== 0 ? pass !== confirmpass ? <span style={{ color: 'red' }}>Mật khẩu xác nhận chưa chính xác</span> : <></> : <></>
                    }
                  </div>
                  <Button color='primary' block disabled={pass !== confirmpass || confirmpass === '' || token === ''} onClick={e => handleResset()}>
                    Đổi mật khẩu
                  </Button>
                </Form>
                <p className='text-center mt-2'>
                  <Link to='/login'>
                    <ChevronLeft className='rotate-rtl me-25' size={14} />
                    <span className='align-middle'>Đăng nhập</span>
                  </Link>
                </p>
              </Col>
            </Col>
          }

        </Row>
      </div>
    )
  } else {
    return <Navigate to='/' />
  }
}

export default ForgotPassword
