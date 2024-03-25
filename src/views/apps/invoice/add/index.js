// ** Invoice Add Components

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import WizardHorizontal from './WizardHorizontal'

const InvoiceAdd = () => {
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        {/* <Col xl={9} md={8} sm={12}>
          <AddCard />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions />
        </Col> */}
        <Col sm='12'>
          <WizardHorizontal />
        </Col>
      </Row>
    </div>
  )
}

export default InvoiceAdd
