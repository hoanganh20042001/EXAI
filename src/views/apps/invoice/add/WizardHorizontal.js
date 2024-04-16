// // ** React Imports
// import { useRef, useState } from 'react'
// import { CardTitle, Col } from 'reactstrap'

// // ** Custom Components
// import Wizard from '@components/wizard'

// // ** Steps
// import Address from './steps-with-validation/Address'
// import PersonalInfo from './steps-with-validation/PersonalInfo'
// import AccountDetails from './steps-with-validation/AccountDetails'
// import StepTest from './steps-with-validation/StepTest'
// import SimpleLineChart from './steps-with-validation/SimpleLineChart'
// import Predict from './steps-with-validation/Predict'
// const WizardHorizontal = () => {
//   // ** Ref
//   const ref = useRef(null)
//   // ** State
//   const [stepper, setStepper] = useState(null)
//   const userData = JSON.parse(localStorage.getItem('userData'))
 

//   const [infoExp, setInfoExp] = useState({
//     expname: "",
//     expmodelid: 1,
//     expdatasetid: 1,
//     expcreatorid: parseInt(userData.id),
//     expsoftwarelibid: 1,
//     paramsconfigs_json: ""
//   })
  
//   const handleChangeInfo = (data, pop) => {
//     setInfoExp({ ...infoExp, [pop]: data })
//   }
  
//   const steps = [
//     {
//       id: 'account-details',
//       title: 'Chọn bộ dữ liệu',
//       subtitle: 'Chọn bộ dữ liệu để huấn luyện',
//       content: <AccountDetails stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo}/>
//     },
//     {
//       id: 'personal-info',
//       title: 'Chọn mô hình',
//       subtitle: 'Chọn mô hình huấn luyện',
//       content: <PersonalInfo stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
      
//     },
//     {
//       id: 'step-address',
//       title: 'Cấu hình tham số',
//       subtitle: 'Cấu hình các tham số để huấn luyện',
//       content: <Address stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
//     },
//     {
//       id: 'step-train',
//       title: 'Huấn luyện',
//       subtitle: 'Theo dõi quá trình huấn luyện',
//       content: <SimpleLineChart warning={'red'} stepper={stepper} infoExp={infoExp}/>

//     },
//     {
//       id: 'step-test',
//       title: 'Đánh giá',
//       subtitle: 'Đánh giá mô hình',
//       content: <StepTest stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
//     },
//     {
//       id: 'step-predict',
//       title: 'Dự đoán',
//       subtitle: 'Tải hình ảnh lên để kiểm tra',
//       content: <Predict stepper={stepper} infoExp={infoExp} />
//     }
//   ]

//   return (
//     <div className='vertical-wizard'>
//       <Col lg='3' className='d-flex align-items-center px-0 px-lg-1'>
//           <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>TẠO BÀI THÍ NGHIỆM</CardTitle>
//         </Col>
//       <Wizard
//         type='vertical'
//         ref={ref}
//         steps={steps}
//         instance={el => {
//           console.log(el)
//           setStepper(el)
//         }}
//       />
//     </div>
//   )
// }

// export default WizardHorizontal
import React, { useRef, useState, useEffect } from 'react'
import { CardTitle, Col } from 'reactstrap'
import Wizard from '@components/wizard'
import Address from './steps-with-validation/Address'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'
import StepTest from './steps-with-validation/StepTest'
import SimpleLineChart from './steps-with-validation/SimpleLineChart'
import Predict from './steps-with-validation/Predict'

const WizardHorizontal = () => {
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const [infoExp, setInfoExp] = useState({

    expname: '',

    expmodelid: 1,
    expdatasetid: 1,
    expcreatorid: parseInt(userData.id),
    expsoftwarelibid: 1,
    paramsconfigs_json: '',
  })
  const [errorFields, setErrorFields] = useState({}) // State để theo dõi các trường bắt buộc bị lỗi

  const handleChangeInfo = (data, pop) => {
    setInfoExp({ ...infoExp, [pop]: data })
    // Xóa thông báo lỗi khi người dùng nhập lại giá trị
    setErrorFields((prevState) => ({ ...prevState, [pop]: '' }))
  }

  const validateFields = () => {
    const errors = {}
    console.log("infoExp: ", infoExp)
    if (infoExp.expname.trim() === null || infoExp.expname.trim() === undefined || infoExp.expname.trim() === "") { 
      errors.expname = 'Không được phép bỏ trống'
    }
    if (infoExp.expmodelid === null || infoExp.expmodelid === undefined || infoExp.expmodelid === 0) { 
      errors.expmodelid = 'Không được phép bỏ trống'
    }
    if (infoExp.expdatasetid === null || infoExp.expdatasetid === undefined || infoExp.expdatasetid === 0) { 
      errors.expdatasetid = 'Không được phép bỏ trống'
    }
    if (infoExp.expsoftwarelibid === null || infoExp.expsoftwarelibid === undefined || infoExp.expsoftwarelibid === 0) { 
      errors.expsoftwarelibid = 'Không được phép bỏ trống'
    }
    // if (infoExp.expname.trim() === null || infoExp.expname.trim() === undefined || infoExp.expname.trim() === "") { 
    //   errors.expname = 'Không được phép bỏ trống'
    // }
    // Thêm các trường khác cần kiểm tra ở đây
    return errors
  }

  const handleNextStep = () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      // Nếu có lỗi, hiển thị thông báo và không cho chuyển bước
      setErrorFields(errors)
    } else {
      // Nếu không có lỗi, chuyển bước tiếp theo
      stepper.next()
    }
  }
  
  // Kiểm tra sự kiện click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(ref.current)
      // if (ref.current && !ref.current.contains(event.target)) {
      const errors = validateFields()
      setErrorFields(errors)
      // }
  }

  document.addEventListener('mousedown', handleClickOutside)
  console.log("Mousedown")
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [validateFields])
  
  const steps = [
    {
      id: 'account-details',
      title: 'Chọn bộ dữ liệu',
      subtitle: 'Chọn bộ dữ liệu để huấn luyện',
      content: <AccountDetails stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo}/>
    },
    {
      id: 'personal-info',
      title: 'Chọn mô hình',
      subtitle: 'Chọn mô hình huấn luyện',
      content: <PersonalInfo stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
      
    },
    {
      id: 'step-address',
      title: 'Cấu hình tham số',
      subtitle: 'Cấu hình các tham số để huấn luyện',
      content: <Address stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
    },
    {
      id: 'step-train',
      title: 'Huấn luyện',
      subtitle: 'Theo dõi quá trình huấn luyện',
      content: <SimpleLineChart warning={'red'} stepper={stepper} infoExp={infoExp}/>

    },
    {
      id: 'step-test',
      title: 'Đánh giá',
      subtitle: 'Đánh giá mô hình',
      content: <StepTest stepper={stepper} infoExp={infoExp} changeInfo={handleChangeInfo} />
    },
    {
      id: 'step-predict',
      title: 'Dự đoán',
      subtitle: 'Tải hình ảnh lên để kiểm tra',
      content: <Predict stepper={stepper} infoExp={infoExp} />
    }
  ]

  return (
    <div className='vertical-wizard'>
      <Col lg='3' className='d-flex align-items-center px-0 px-lg-1'>

        <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>
          TẠO BÀI THÍ NGHIỆM
        </CardTitle>
      </Col>

      <Wizard
        type='vertical'
        ref={ref}
        steps={steps}
        instance={(el) => {
          setStepper(el)
        }}
        onNextStep={handleNextStep} // Gọi hàm này khi người dùng chuyển sang bước tiếp theo
      />
    </div>
  )
}

export default WizardHorizontal
