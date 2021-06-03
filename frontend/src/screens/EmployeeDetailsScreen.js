import moment from 'moment'
import {
  FaAddressCard,
  FaDownload,
  FaEnvelope,
  FaFlag,
  FaMobile,
  FaMoneyCheck,
  FaUniversity,
} from 'react-icons/fa'

const EmployeeDetailsScreen = ({ employeeDetails }) => {
  const {
    address,
    birthday,
    department,
    email,
    employeeId,
    gender,
    hiredDate,
    mobile,
    national,
    position,
    document,
    bankName,
    bankAccount,
  } = employeeDetails
  return (
    <>
      <span className='fw-light fs-5 text-info '>Personal Info</span> <br />
      <span>Employee ID: {employeeId}</span> <br />
      <span>Gender: {gender}</span> <br />
      <span>Birthday: {moment(birthday).format('YYYY-MM-DD')}</span> <br />
      <span>Department: {department && department.name}</span> <br />
      <span>Position: {position && position.name}</span> <br />
      <span>
        Hired Date: {moment(hiredDate).format('YYYY-MM-DD')}
      </span> <br /> <br />
      <span className='fw-light fs-5 text-info '>Contact Info</span> <br />
      <span>
        <FaFlag /> {national}
      </span>
      <br />
      <span>
        <FaEnvelope /> <a href={`mailto:${email}`}> {email} </a>
      </span>
      <br />
      <span>
        <FaMobile /> {mobile}
      </span>
      <br />
      <span>
        <FaAddressCard /> {address}
      </span>
      <br /> <br />
      <span className='fw-light fs-5 text-info '>Bank Info</span> <br />
      <span>
        <FaUniversity /> {bankName}
      </span>
      <br />
      <span>
        <FaMoneyCheck /> {bankAccount}
      </span>
      <br />
      <br />
      <span className='fw-light fs-5 text-info '>Curriculum Vitae (CV)</span>
      <br />
      <span>
        <FaDownload />{' '}
        <a href={document && document.documentPath} target='blank'>
          {document && document.documentPath}
        </a>
      </span>
    </>
  )
}

export default EmployeeDetailsScreen
