// ** Invoice Add Components

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import WizardHorizontal from './WizardHorizontal'
import axios from 'axios'
const InvoicePreview = () => {
  const { id } = useParams()
  const [exp, setExp] = useState()
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/${id}/`
      , {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },

      }).then(response => {
        setExp(response.data)
      })

  }, [])
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col sm='12'>
          {
            exp && <WizardHorizontal exp={exp} />
          }
          
        </Col>
      </Row>
    </div>
  )
}

export default InvoicePreview
