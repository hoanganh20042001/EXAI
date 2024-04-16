// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import { getListUser, updateUser, deleteUser, getInfo } from '@store/action/profile'
import { useSelector, useDispatch } from 'react-redux'

// ** Styles
import '@styles/react/pages/page-profile.scss'

const Profile = () => {
  // ** States
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }
  const dataUser = useSelector((state) => {
    return state.profile.dataUser
  })
  
  const user = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    dispatch(getInfo(user.id))
  }, [dispatch])
  return (
    <Fragment>
      {/* <Breadcrumbs title='Thông tin cá nhân' data={[{ title: 'Pages' }, { title: 'Thông tin cá nhân' }]} /> */}
      {/* {data !== null ? ( */}
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader data={dataUser} />
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              <Col lg={{ size: 12, order: 12 }} sm={{ size: 12 }} xs={{ order: 12 }}>
                <ProfileAbout data={dataUser} />
              </Col>
            </Row>
          </section>
        </div>
      {/* ) : null} */}
    </Fragment>
  )
}

export default Profile
