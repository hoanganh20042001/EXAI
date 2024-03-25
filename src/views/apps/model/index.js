// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageModel from './ManageModel'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Models = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageModel />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Models
