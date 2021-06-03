const WriteUpReportScreen = ({ newSearchedWriteUpArray, Moment, moment }) => {
  return (
    <div>
      {newSearchedWriteUpArray.length > 0 ? (
        newSearchedWriteUpArray.map((data, index) => (
          <div className='row' key={data._id}>
            <div className='col-12'>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                {index + 1} - Write Up -
                {moment(data.createdAt).format('Do MMM YYYY ')}
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
              {data.employee && data.employee.name}
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
                Offense Committed
              </label>
            </div>
            <div className='col-8 text-primary'> {data.offenseCommitted} </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Offense Committed Details
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.offenseCommittedDetails} <hr />
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Action Plan
              </label>
            </div>
            <div className='col-8 text-primary'> {data.actionPlan}</div>
          </div>
        ))
      ) : (
        <p className='text-center text-danger'>
          No write-up records was found!
        </p>
      )}
    </div>
  )
}

export default WriteUpReportScreen
