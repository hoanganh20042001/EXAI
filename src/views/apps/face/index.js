// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageFace from './ManageFace'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const DataList = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageFace />
        </Col>
      </Row>
    </Fragment>
  )
}

export default DataList
