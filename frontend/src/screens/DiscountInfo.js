import React from 'react'

const DiscountInfo = ({ info }) => {
  return (
    <>
      {info.empId && (
        <>
          {info.empId && (
            <>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                Employee Info
              </h5>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Employee ID
                  </label>
                </div>
                <div className='col-8 text-primary'> {info.empId} </div>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Employee Name
                  </label>
                </div>
                <div className='col-8 text-primary'> {info.empName} </div>

                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Department
                  </label>
                </div>
                <div className='col-8 text-primary'>
                  {' '}
                  {info.department.name}{' '}
                </div>
              </div>
            </>
          )}
          {info.fatherName && (
            <>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                Parent Info
              </h5>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Father ID
                  </label>
                </div>
                <div className='col-8 text-primary'> {info.fatherName} </div>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Mother Name
                  </label>
                </div>
                <div className='col-8 text-primary'> {info.motherName} </div>
              </div>
            </>
          )}
          {info.wives && info.isMale && !info.isSingle && (
            <>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                Wives Info
              </h5>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Wives Name
                  </label>
                </div>
                <div className='col-8 text-primary'>
                  {info.wives &&
                    info.wives.map((wife, index) => (
                      <h6 key={index}>
                        {index + 1}:{' '}
                        <span className='badge bg-dark'>{wife}</span>
                      </h6>
                    ))}
                </div>
              </div>
            </>
          )}
          {info.husband && (
            <>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                Husband Info
              </h5>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Husband Name
                  </label>
                </div>
                <div className='col-8 text-primary'>
                  {info.husband && info.husband}
                </div>
              </div>
            </>
          )}

          {info.hasChildren && (
            <>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                Children Info
              </h5>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='' className='font-weight-bolder'>
                    Children Name
                  </label>
                </div>
                <div className='col-8 text-primary'>
                  {info.children &&
                    info.children.map((child, index) => (
                      <h6 key={index}>
                        {index + 1}:{' '}
                        <span className='badge bg-dark'>{child}</span>
                      </h6>
                    ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default DiscountInfo
