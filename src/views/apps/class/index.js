// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageClass from './ManageClass'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Class = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageClass />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Class
