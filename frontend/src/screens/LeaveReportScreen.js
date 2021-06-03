const LeaveReportScreen = ({ newSearchedLeaveArray, Moment, moment }) => {
  return (
    <div>
      {newSearchedLeaveArray.length > 0 ? (
        newSearchedLeaveArray.map((data, index) => (
          <div className='row' key={data._id}>
            <div className='col-12'>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                {index + 1} - Leave -
                {moment(data.start_date).format('Do MMM YYYY ')}
              </h5>
            </div>
          

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Employee ID
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.employeeId}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Employee Name
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.employeeName}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Department
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.department.name}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Leave Type
              </label>
            </div>
            <div className='col-8 text-primary'> {data.leave}</div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Date
              </label>
            </div>
            <div className='col-8 text-primary'>
              <Moment format='YYYY-MM-DD '>{moment(data.start_date)}</Moment>-
              <Moment format=' YYYY-MM-DD '>{moment(data.end_date)}</Moment>
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Description
              </label>
            </div>
            <div className='col-8 text-primary'>{data.description}</div>
          </div>
        ))
      ) : (
        <p className='text-center text-danger'>No leave records was found!</p>
      )}
    </div>
  )
}

export default LeaveReportScreen
