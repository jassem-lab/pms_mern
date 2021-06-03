import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import {
  listPosition,
  createPosition,
  updatePosition,
  deletePosition,
} from '../actions/positionActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const PositionScreen = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()
  const positionList = useSelector((state) => state.positionList)
  const { positions, error, loading } = positionList

  const positionCreate = useSelector((state) => state.positionCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = positionCreate

  const positionUpdate = useSelector((state) => state.positionUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = positionUpdate

  const positionDelete = useSelector((state) => state.positionDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = positionDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setName('')
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listPosition())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deletePosition(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit
      ? dispatch(updatePosition({ name, id }))
      : dispatch(createPosition({ name }))
  }

  const editHandler = (e) => {
    setName(e.name)
    setId(e._id)
    setEdit(true)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    positions && positions.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = positions && Math.ceil(positions.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='positionModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='positionModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='positionModalLabel'>
                {edit ? 'Edit Position' : 'Add Position'}
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
                  Position Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>
                  Position Updated Successfully
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
                      <label htmlFor='name'>Position Name</label>
                      <input
                        required
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        value={name}
                        className='form-control '
                        placeholder='Enter position name'
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
        <h1>Position</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#positionModal'
        >
          {' '}
          <FaPlus /> REGISTER NEW POSITION
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Position Deleted Successfully</Message>
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
                {positions && positions.length} records were found
              </caption>
              <thead>
                <tr>
                  <th>DATE & TIME</th>
                  <th>POSITION</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((dep) => (
                    <tr key={dep._id}>
                      <td>
                        <Moment format='YYYY-MM-DD HH:mm:ss'>
                          {moment(dep.createdAt)}
                        </Moment>
                      </td>
                      <td>{dep.name}</td>

                      <td className='btn-group' role='group'>
                        <button
                          className='btn btn-light btn-sm'
                          onClick={(e) => editHandler(dep)}
                          data-bs-toggle='modal'
                          data-bs-target='#positionModal'
                        >
                          <FaEdit /> Edit
                        </button>
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(dep._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {positions && !loading && positions.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={positions && positions.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PositionScreen