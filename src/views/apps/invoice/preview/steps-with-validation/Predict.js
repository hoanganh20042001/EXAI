

// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Row, Col, Form } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud, ArrowRight, ArrowLeft } from 'react-feather'
import axios from 'axios'

const Predict = ({ stepper, infoExp }) => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({})
  // ** State
  const [files, setFiles] = useState([])
  const [files1, setFiles1] = useState([])
  const [display, setDisplay] = useState('block')
  const [display1, setDisplay1] = useState('block')
  const [url, setUrl] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return (
        <Row className='my-2'>
          <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='6' xs='6'>
            <div className='d-flex align-items-center justify-content-center'>
              <img className='img-fluid product-img' src={URL.createObjectURL(file)} alt={'ảnh test'} />
            </div>
          </Col>
        </Row>
      )
    } else {
      return <FileText size='28' />
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
      </div>
    </ListGroupItem>
  ))
  const onSubmit = data => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/get_predict_result/?id_predict=6`
      , {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },

      }).then(response => {
        const temp = response.data.data.data.outputpath
        const path = url + temp.slice(1, temp.length) + response.data.data.result[0]
        setUrl(path)
      })

  }
  const handleRemoveAllFiles = () => {
    setFiles([])
    setDisplay('block')
    setDisplay1('block')
  }
  if (infoExp.expsoftwarelibid === 1) {
    return (
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody>
          <div {...getRootProps({ className: 'dropzone' })} style={{ display: display }}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>Chọn ảnh khuôn mặt</h5>
              <p className='text-secondary'>
                Drop files here or click{' '}
                <a href='/' onClick={e => {
                  e.preventDefault()
                  setDisplay('none')
                }}>
                  browse
                </a>{' '}
                thorough your machine
              </p>
            </div>
          </div>
          <div {...getRootProps({ className: 'dropzone' })} style={{ display: display1 }}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>Chọn ảnh phát hiện khuôn mặt</h5>
              <p className='text-secondary'>
                Drop files here or click{' '}
                <a href='/' onClick={e => {
                  e.preventDefault()
                  setDisplay1('none')
                }}>
                  browse
                </a>{' '}
                thorough your machine
              </p>
            </div>
          </div>
          {files.length ? (
            <Fragment>
              <ListGroup className='my-2'>{fileList}</ListGroup>
              {
                url &&
                <Row>
                  <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='6' xs='12'>
                    <div className='d-flex align-items-center justify-content-center'>
                      <img className='img-fluid product-img' src={url} alt={'ảnh đầu ra'} />
                    </div>
                  </Col>
                </Row>
              }

              <div className='d-flex justify-content-end'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    Remove All
                  </Button>
                  <Button type='submit' color='primary'>Kiểm tra</Button>
                </Form>
              </div>
            </Fragment>
          ) : null}
          <div className='d-flex justify-content-between' style={{ marginTop: '20px' }}>
            <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
              <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
              <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button type='button' color='primary' className='btn-next' onClick={() => setUrl(URL.createObjectURL(files))}>
              <span className='align-middle d-sm-inline-block d-none'>Xuất báo cáo</span>
            </Button>
          </div>
        </CardBody>
      </Card >
    )
  } else if (infoExp.expsoftwarelibid === 2) {
    return (
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody>
          <div {...getRootProps({ className: 'dropzone' })} style={{ display: display }}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>Chọn video phát hiện hành động</h5>
              <p className='text-secondary'>
                Drop files here or click{' '}
                <a href='/' onClick={e => e.preventDefault()}>
                  browse
                </a>{' '}
                thorough your machine
              </p>
            </div>
          </div>
          {files.length ? (
            <Fragment>
              <ListGroup className='my-2'>{fileList}</ListGroup>
              {
                url &&
                <Row>
                  <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='6' xs='12'>
                    <div className='d-flex align-items-center justify-content-center'>
                      <img className='img-fluid product-img' src={url} alt={'ảnh đầu ra'} />
                    </div>
                  </Col>
                </Row>
              }
              <div className='d-flex justify-content-end'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    Remove All
                  </Button>
                  <Button type='submit' color='primary'>Kiểm tra</Button>
                </Form>
              </div>
            </Fragment>
          ) : null}
          <div className='d-flex justify-content-between' style={{ marginTop: '20px' }}>
            <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
              <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
              <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button type='button' color='primary' className='btn-next' onClick={() => setUrl(URL.createObjectURL(files))}>
              <span className='align-middle d-sm-inline-block d-none'>Xuất báo cáo</span>
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody>
          <div {...getRootProps({ className: 'dropzone' })} style={{ display: display }}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>Chọn ảnh phát hiện khuôn mặt</h5>
              <p className='text-secondary'>
                Drop files here or click{' '}
                <a href='/' onClick={e => e.preventDefault()}>
                  browse
                </a>{' '}
                thorough your machine
              </p>
            </div>
          </div>
          {files.length ? (
            <Fragment>
              <ListGroup className='my-2'>{fileList}</ListGroup>
              {
                url &&
                <Row>
                  <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='6' xs='12'>
                    <div className='d-flex align-items-center justify-content-center'>
                      <img className='img-fluid product-img' src={url} alt={'ảnh đầu ra'} />
                    </div>
                  </Col>
                </Row>
              }
              <div className='d-flex justify-content-end'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    Remove All
                  </Button>
                  <Button type='submit' color='primary'>Kiểm tra</Button>
                </Form>
              </div>
            </Fragment>
          ) : null}
          <div className='d-flex justify-content-between' style={{ marginTop: '20px' }}>
            <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
              <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
              <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button type='button' color='primary' className='btn-next' onClick={() => setUrl(URL.createObjectURL(files))}>
              <span className='align-middle d-sm-inline-block d-none'>Xuất báo cáo</span>
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }

}

export default Predict

