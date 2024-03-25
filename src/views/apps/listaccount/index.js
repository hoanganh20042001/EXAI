// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageAccount from './ManageAccount'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const DataAccount = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageAccount />
        </Col>
      </Row>
    </Fragment>
  )
}

export default DataAccount
