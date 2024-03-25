// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageRequest from './ManageRequest'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Request = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageRequest />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Request
