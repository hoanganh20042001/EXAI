// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Activity, Database, Users, Search } from 'react-feather'

export default [
  {
    id: 'invoiceApp',
    title: 'Bài thí nghiệm',
    icon: <Activity size={20} />,
    navLink: '/apps/invoice/list'
  },
  
  {
    id: 'dataApp',
    title: 'Bộ dữ liệu',
    icon: <Database size={20} />,
    navLink: '/apps/data/list'
  },
  {
    id: 'dataModel',
    title: 'Mô hình',
    icon: <Users size={20} />,
    navLink: '/apps/model'
  },
  {
    id: 'dataLibs',
    title: 'Thư viện',
    icon: <Users size={20} />,
    navLink: '/apps/libs'
  },
  {
    id: 'phisingUrl',
    title: 'Phising Url',
    icon: <Shield size={20} />,
    navLink: '/url-phishing/',
    externalLink: true
  },
  // {
  //   id: 'email',
  //   title: 'Email',
  //   icon: <Mail size={20} />,
  //   navLink: '/apps/email'
  // },
  // {
  //   id: 'chat',
  //   title: 'Chat',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/apps/chat'
  // },
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  // {
  //   id: 'kanban',
  //   title: 'Kanban',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/kanban'
  // },
  

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // }
  {
    id: 'searhFace',
    title: 'Tìm kếm đối tượng',
    icon: <Search size={20} />,
    children: [
      {
        id: 'face-manage',
        title: 'Quản lý đối tượng',
        icon: <Circle size={12} />,
        navLink: '/apps/face'
      },
      {
        id: 'search',
        title: 'Tìm kiếm',
        icon: <Circle size={12} />,
        navLink: '/apps/search'
      }
    ]
  }
]
