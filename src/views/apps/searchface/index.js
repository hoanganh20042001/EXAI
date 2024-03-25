// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import ManageSearchFace from './ManageSearchFace'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const SearchFace = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ManageSearchFace />
        </Col>
      </Row>
    </Fragment>
  )
}

export default SearchFace
