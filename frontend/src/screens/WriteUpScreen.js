import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listWriteUp,
  createWriteUp,
  updateWriteUp,
  deleteWriteUp,
} from '../actions/writeUpActions'
import { listEmployee } from '../actions/employeeActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'
import { FaPlus } from 'react-icons/fa'

const WriteUpScreen = () => {
  const [values, setValues] = useState({
    employee: '',
    offenseCommitted: '',
    offenseCommittedDetails: '',
    actionPlan: '',
  })
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()
  const writeUpList = useSelector((state) => state.writeUpList)
  const { writeUps, error, loading } = writeUpList

  const employeeList = useSelector((state) => state.employeeList)
  const { employees } = employeeList

  const writeUpCreate = useSelector((state) => state.writeUpCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = writeUpCreate

  const writeUpUpdate = useSelector((state) => state.writeUpUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = writeUpUpdate

  const writeUpDelete = useSelector((state) => state.writeUpDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = writeUpDelete

  const formCleanHandler = () => {
    setValues({
      ...values,
      employee: '',
      offenseCommitted: '',
      offenseCommittedDetails: '',
      actionPlan: '',
    })
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listWriteUp())
    dispatch(listEmployee())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteWriteUp(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit ? dispatch(updateWriteUp(values)) : dispatch(createWriteUp(values))
  }

  const editHandler = (e) => {
    setValues({
      ...values,
      _id: e._id,
      employee: e.employee._id,
      offenseCommitted: e.offenseCommitted,
      offenseCommittedDetails: e.offenseCommittedDetails,
      actionPlan: e.actionPlan,
    })
    setEdit(true)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    writeUps && writeUps.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = writeUps && Math.ceil(writeUps.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='writeUpModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='writeUpModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='writeUpModalLabel'>
                {edit ? 'Edit Write Up' : 'Add Write Up'}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {successCreate && (
                <Message variant='success'>
                  Write Up Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>
                  Write Up Updated Successfully
                </Message>
              )}
              {loadingUpdate ? (
                <Loader />
              ) : (
                errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
              )}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className='row gy-2'>
                    <div className='form-group'>
                      <label htmlFor='employee'>Employee ID</label>
                      <input
                        name='employee'
                        value={values.employee}
                        onChange={handleChange}
                        className='form-control py-2'
                        required
                        list='employeeOptions'
                        id='exampleDataList'
                        placeholder='Type to search employee by name...'
                      />
                      <datalist id='employeeOptions'>
                        {employees &&
                          employees.map(
                            (employee) =>
                              employee.active && (
                                <option key={employee._id} value={employee._id}>
                                  {employee.employeeName}
                                </option>
                              )
                          )}
                      </datalist>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='offenseCommitted'>
                        Offense Committed
                      </label>
                      <select
                        name='offenseCommitted'
                        onChange={handleChange}
                        value={values.offenseCommitted}
                        className='form-control py-2'
                        required
                      >
                        <option value='' disabled>
                          Offense Committed Type...
                        </option>
                        <option value='Absenteeism'>Absenteeism</option>
                        <option value='AWOL'>AWOL</option>
                        <option value='Conduct Unbecoming'>
                          Conduct Unbecoming
                        </option>
                        <option value='Dereliction of Duty'>
                          Dereliction of Duty
                        </option>
                        <option value='Habitual Tardiness'>
                          Habitual Tardiness
                        </option>
                        <option value='Habitual Undertime'>
                          Habitual Undertime
                        </option>
                        <option value='Insubordination'>Insubordination</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='offenseCommittedDetails'>
                        Offense Committed Details
                      </label>
                      <textarea
                        rows='5'
                        cols='30'
                        name='offenseCommittedDetails'
                        onChange={handleChange}
                        type='date'
                        value={values.offenseCommittedDetails}
                        className='form-control py-2'
                        placeholder='Enter offense committed details'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='actionPlan'>Action Plan</label>
                      <textarea
                        rows='5'
                        cols='30'
                        name='actionPlan'
                        onChange={handleChange}
                        type='date'
                        value={values.actionPlan}
                        className='form-control py-2'
                        placeholder='Enter action plan'
                      />
                    </div>

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                        onClick={formCleanHandler}
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h1>Employee Write Up Form</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#writeUpModal'
        >
          <FaPlus /> REGISTER NEW WRITE UP REQUEST
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Write Up Deleted Successfully</Message>
      )}
      {loadingDelete ? (
        <Loader />
      ) : (
        errorDelete && <Message variant='danger'>{errorDelete}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped caption-top'>
              <caption>
                {writeUps && writeUps.length} records were found
              </caption>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Emp. ID</th>
                  <th>Emp. Name</th>
                  <th>Offense Committed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((writeUp) => {
                    return (
                      <tr key={writeUp._id}>
                        <td>
                          <Moment format='YYYY-MM-DD HH:mm'>
                            {moment(writeUp.createdAt)}
                          </Moment>
                        </td>
                        <td>{writeUp.employee.employeeId}</td>
                        <td>{writeUp.employee.employeeName}</td>
                        <td>{writeUp.offenseCommitted}</td>

                        <td className='btn-group'>
                          <button
                            onClick={() => editHandler(writeUp)}
                            className='btn btn-light btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#writeUpModal'
                          >
                            <i className='fa fa-edit'></i> Edit
                          </button>{' '}
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(writeUp._id)}
                          >
                            <i className='fa fa-trash'></i> Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {writeUps && !loading && writeUps.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={writeUps && writeUps.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default WriteUpScreen
