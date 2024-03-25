// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
import profile from './profile'
import department from './department'
import history from './history'
import session from './session'
import dataset from './dataset'
import experiment from './experiment'
import model from './model'
import classes from './classes'
import libs from './libs'
import request from './request'
import face from './face'
const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  face,
  layout,
  profile,
  department,
  request,
  history,
  session,
  dataset,
  experiment,
  model,
  libs,
  classes,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions
}

export default rootReducer
