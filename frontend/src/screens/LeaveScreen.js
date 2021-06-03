import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import {
  listLeave,
  createLeave,
  updateLeave,
  deleteLeave,
} from '../actions/leaveActions'
import { listEmployee } from '../actions/employeeActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'

const LeaveScreen = () => {
  const [values, setValues] = useState({
    employee: '',
    leave: '',
    start_date: '',
    end_date: '',
    description: '',
  })
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()
  const leaveList = useSelector((state) => state.leaveList)
  const { leaves, error, loading } = leaveList

  const employeeList = useSelector((state) => state.employeeList)
  const { employees } = employeeList

  const leaveCreate = useSelector((state) => state.leaveCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = leaveCreate

  const leaveUpdate = useSelector((state) => state.leaveUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = leaveUpdate

  const leaveDelete = useSelector((state) => state.leaveDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = leaveDelete

  const formCleanHandler = () => {
    setValues({
      ...values,
      employee: '',
      leave: '',
      start_date: '',
      end_date: '',
      description: '',
    })
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listLeave())
    dispatch(listEmployee())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteLeave(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit ? dispatch(updateLeave(values)) : dispatch(createLeave(values))
  }

  const editHandler = (e) => {
    setValues({
      ...values,
      _id: e._id,
      employee: e.employee._id,
      leave: e.leave,
      start_date: moment(e.start_date).format('YYYY-MM-DD'),
      end_date: moment(e.end_date).format('YYYY-MM-DD'),
      description: e.description,
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
  const currentItems = leaves && leaves.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = leaves && Math.ceil(leaves.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='leaveModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='leaveModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='leaveModalLabel'>
                {edit ? 'Edit Leave' : 'Add Leave'}
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
                  Leave Request Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>
                  Leave Request Updated Successfully
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
                      <label htmlFor='employee'>Employee Name</label>
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
                      <label htmlFor='employee'>Leave Type</label>
                      <select
                        name='leave'
                        onChange={handleChange}
                        value={values.leave}
                        className='form-control py-2'
                        required
                      >
                        <option value='' disabled>
                          Leave Type...
                        </option>
                        <option value='Holyday'>Holyday</option>
                        <option value='Paid'>Paid</option>
                        <option value='Maternity'>Maternity</option>
                        <option value='Annual'>Annual</option>
                        <option value='Sick'>Sick</option>
                        <option value='Marriage'>Marriage</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='employee'>Start Date</label>
                      <input
                        name='start_date'
                        onChange={handleChange}
                        type='date'
                        value={values.start_date}
                        className='form-control py-2'
                        placeholder='Enter start date'
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='employee'>End Date</label>
                      <input
                        name='end_date'
                        onChange={handleChange}
                        type='date'
                        value={values.end_date}
                        className='form-control py-2'
                        placeholder='Enter end date'
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='employee'>Description</label>
                      <textarea
                        rows='5'
                        cols='30'
                        name='description'
                        onChange={handleChange}
                        type='date'
                        value={values.description}
                        className='form-control py-2'
                        placeholder='Enter description'
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
        <h1>Leave</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#leaveModal'
        >
          <FaPlus /> REGISTER NEW LEAVE REQUEST
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Leave Request Deleted Successfully</Message>
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
              <caption>{leaves && leaves.length} records were found</caption>
              <thead>
                <tr>
                  <th>Emp. ID</th>
                  <th>Emp. Name</th>
                  <th>Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((leave) => {
                    console.log(leave)
                    return (
                      
                      <tr key={leave._id}>
                        <td>{leave.employee.employeeId}</td>
                        <td>{leave.employee.employeeName}</td>
                        <td>{leave.leave}</td>
                        <td>
                          <Moment format='YYYY-MM-DD'>
                            {moment(leave.start_date)}
                          </Moment>
                        </td>
                        <td>
                          <Moment format='YYYY-MM-DD'>
                            {moment(leave.end_date)}
                          </Moment>
                        </td>
                        <td className='btn-group'>
                          <button
                            onClick={() => editHandler(leave)}
                            className='btn btn-light btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#leaveModal'
                          >
                            <FaEdit /> Edit
                          </button>{' '}
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(leave._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {leaves && !loading && leaves.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={leaves && leaves.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LeaveScreen
