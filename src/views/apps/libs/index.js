// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageLibs from './ManageLibs'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Libs = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageLibs />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Libs
