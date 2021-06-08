import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import {
  listDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../actions/departmentActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const DepartmentScreen = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()
  const departmentList = useSelector((state) => state.departmentList)
  const { departments, error, loading } = departmentList

  const departmentCreate = useSelector((state) => state.departmentCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = departmentCreate

  const departmentUpdate = useSelector((state) => state.departmentUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = departmentUpdate

  const departmentDelete = useSelector((state) => state.departmentDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = departmentDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setName('')
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listDepartment())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteDepartment(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit
      ? dispatch(updateDepartment({ name, id }))
      : dispatch(createDepartment({ name }))
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
    departments && departments.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = departments && Math.ceil(departments.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='departmentModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='departmentModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='departmentModalLabel'>
                {edit ? 'Edit Department' : 'Add Department'}
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
                  Department Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>
                  Department Updated Successfully
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
                      <label htmlFor='name'>Nom du department</label>
                      <input
                        required
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        value={name}
                        className='form-control '
                        placeholder='Enter department name'
                      />
                    </div>

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                        onClick={formCleanHandler}
                      >
                        fermer
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        valider
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
        <h1>Department</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#departmentModal'
        >
          {' '}
          <FaPlus /> Ajouter nouvelle department
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Department effacée avec succés</Message>
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
                {departments && departments.length} records non trouvés
              </caption>
              <thead>
                <tr>
                  <th>DATE & HEURE</th>
                  <th>DEPARTMENT</th>
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
                          data-bs-target='#departmentModal'
                        >
                          <FaEdit /> Modifier
                        </button>
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(dep._id)}
                          >
                            <FaTrash /> Effacer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {departments && !loading && departments.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={departments && departments.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DepartmentScreen
