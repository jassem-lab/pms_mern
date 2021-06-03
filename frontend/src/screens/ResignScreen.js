import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import {
  listResign,
  createResign,
  updateResign,
  deleteResign,
} from '../actions/resignActions'
import { listEmployee } from '../actions/employeeActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const ResignScreen = () => {
  const [id, setId] = useState(null)
  const [employee, setEmployee] = useState('')
  const [resignDate, setResignDate] = useState('')
  const [resignType, setResignType] = useState('')
  const [resignReason, setResignReason] = useState('')
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()
  const resignList = useSelector((state) => state.resignList)
  const { resigns, error, loading } = resignList

  const resignCreate = useSelector((state) => state.resignCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = resignCreate

  const resignUpdate = useSelector((state) => state.resignUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = resignUpdate

  const resignDelete = useSelector((state) => state.resignDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = resignDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const employeeList = useSelector((state) => state.employeeList)
  const { employees } = employeeList

  const formCleanHandler = () => {
    setEmployee('')
    setResignReason('')
    setResignReason('')
    setResignType('')
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listResign())
    dispatch(listEmployee())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteResign(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit
      ? dispatch(
          updateResign({ employee, resignDate, resignType, resignReason, id })
        )
      : dispatch(
          createResign({ employee, resignDate, resignType, resignReason })
        )
  }

  const editHandler = (e) => {
    setEmployee(e.employee._id)
    setResignDate(moment(e.resignDate).format('YYYY-MM-DD'))
    setResignReason(e.resignReason)
    setResignType(e.resignType)
    setId(e._id)
    setEdit(true)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    resigns && resigns.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = resigns && Math.ceil(resigns.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='resignModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='resignModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='resignModalLabel'>
                {edit ? 'Edit Resign' : 'Add Resign'}
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
                  Resign Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>Resign Updated Successfully</Message>
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
                        onChange={(e) => setEmployee(e.target.value)}
                        value={employee}
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
                      <label htmlFor='employee'>Resign Type</label>
                      <select
                        name='resignType'
                        onChange={(e) => setResignType(e.target.value)}
                        value={resignType}
                        className='form-control py-2'
                        required
                      >
                        <option value=''>Resign Type...</option>
                        <option value='Quit'>Quit</option>
                        <option value='Dismissed'>Dismissed</option>
                        <option value='Resign'>Resign</option>
                        <option value='Transfer'>Transfer</option>
                        <option value='Retain Job Without Salary'>
                          Retain Job Without Salary
                        </option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='employee'>Resign Date</label>
                      <input
                        name='resignDate'
                        onChange={(e) => setResignDate(e.target.value)}
                        type='date'
                        value={resignDate}
                        className='form-control py-2'
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='employee'>Resign Reason</label>
                      <textarea
                        rows='5'
                        cols='30'
                        name='resignReason'
                        onChange={(e) => setResignReason(e.target.value)}
                        type='date'
                        value={resignReason}
                        className='form-control py-2'
                        placeholder='Enter resign reason'
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
        <h1>Resign</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#resignModal'
        >
          {' '}
          <FaPlus /> REGISTER NEW RESIGN
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Resign Deleted Successfully</Message>
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
              <caption>{resigns && resigns.length} records were found</caption>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Resign Type</th>
                  <th>Resign Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((resi) => (
                    <tr key={resi._id}>
                      <td>{resi.employee.employeeId}</td>
                      <td>{resi.employee.employeeName}</td>
                      <td>{resi.employee.department.name}</td>
                      <td>{resi.resignType}</td>

                      <td>
                        <Moment format='YYYY-MM-DD'>
                          {moment(resi.resignDate)}
                        </Moment>
                      </td>

                      <td className='btn-group' role='group'>
                        <button
                          className='btn btn-light btn-sm'
                          onClick={(e) => editHandler(resi)}
                          data-bs-toggle='modal'
                          data-bs-target='#resignModal'
                        >
                          <FaEdit /> Edit
                        </button>
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(resi._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {resigns && !loading && resigns.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={resigns && resigns.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ResignScreen
