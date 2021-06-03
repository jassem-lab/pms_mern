import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa'
import {
  listDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from '../actions/discountActions'
import { listDepartment } from '../actions/departmentActions'
import DiscountInfo from './DiscountInfo'
import DiscountValidate from '../validations/DiscountValidate'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const DiscountScreen = () => {

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dInfo, setDInfo] = useState({})
  const [formData, setFormData] = useState({
    empId: '',
    empName: '',
    department: '',
    fatherName: '',
    motherName: '',
    isSingle: true,
    isMale: true,
    wives: '',
    husband: '',
    hasChildren: false,
    children: '',
  })

  const {
    empId,
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const discountList = useSelector((state) => state.discountList)
  const { discounts, error, loading } = discountList

  const discountCreate = useSelector((state) => state.discountCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = discountCreate

  const discountUpdate = useSelector((state) => state.discountUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = discountUpdate

  const discountDelete = useSelector((state) => state.discountDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = discountDelete

  const departmentList = useSelector((state) => state.departmentList)
  const { departments } = departmentList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setFormData({
      ...formData,
      empId: '',
      empName: '',
      department: '',
      fatherName: '',
      motherName: '',
      isSingle: true,
      isMale: true,
      wives: '',
      husband: '',
      hasChildren: false,
      children: '',
    })
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listDiscount())
    dispatch(listDepartment())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }

    // eslint-disable-next-line
  }, [dispatch, successDelete, successCreate, successUpdate])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteDiscount(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setErrors(DiscountValidate(formData))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      edit
        ? dispatch(updateDiscount(formData))
        : dispatch(createDiscount(formData))
    }
    // eslint-disable-next-line
  }, [errors, dispatch])

  const editHandler = (e) => {
    setFormData({
      ...formData,
      _id: e._id,
      empId: e.empId,
      empName: e.empName,
      department: e.department._id,
      fatherName: e.fatherName,
      motherName: e.motherName,
      isSingle: e.isSingle,
      isMale: e.isMale,
      wives: e.wives,
      husband: e.husband,
      hasChildren: e.hasChildren,
      children: e.children,
    })
    setEdit(true)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    discounts && discounts.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = discounts && Math.ceil(discounts.length / itemsPerPage)

  return (
    <>
      {successDelete && (
        <Message variant='success'>Discount Deleted Successfully</Message>
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
          {userInfo && userInfo && (
            <>
              <div className='table-responsive'>
                <table className='table table-sm hover bordered striped caption-top'>
                  <caption>
                    {discounts && discounts.length} records were found
                  </caption>
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems &&
                      currentItems.map((discount) => {
                        return (
                          <tr
                            key={discount._id}
                            id={discount._id % 2 === 0 ? 'orange' : 'green'}
                          >
                            <td>
                              <Moment format='YYYY-MM-DD HH:mm:ss'>
                                {moment(discount.createdAt)}
                              </Moment>
                            </td>
                            <td>{discount.empId}</td>
                            <td>{discount.empName}</td>
                            <td>{discount.department.name}</td>
                            <td className='btn-group'>
                              {userInfo && userInfo.isAdmin && (
                                <>
                                  <button
                                    onClick={() => editHandler(discount)}
                                    className='btn btn-info btn-sm'
                                    data-bs-placement='top'
                                    title='Edit Info'
                                  >
                                    <FaEdit /> Edit
                                  </button>
                                  <button
                                    onClick={() => deleteHandler(discount._id)}
                                    className='btn btn-danger btn-sm'
                                    data-bs-placement='top'
                                    title='Delete employee '
                                  >
                                    <FaTrash /> Delete
                                  </button>
                                </>
                              )}
                              <button
                                className='btn btn-success btn-sm'
                                data-bs-toggle='modal'
                                data-bs-target='#discountInfoModal'
                                onClick={() => setDInfo(discount)}
                                data-bs-placement='top'
                                title='Employee Info'
                              >
                                <FaInfoCircle /> View
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>

                {discounts && !loading && discounts.length === 0 && (
                  <span className='text-danger d-flex justify-content-center'>
                    No data found!
                  </span>
                )}
                <div className='d-flex justify-content-center'>
                  <Pagination
                    setCurrentPage={setCurrentPage}
                    totalItems={totalItems}
                    arrayLength={discounts && discounts.length}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              </div>

              <div
                className='modal fade'
                id='discountInfoModal'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabIndex='-1'
                aria-labelledby='discountInfoModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='discountInfoModalLabel'>
                        {dInfo.empId && dInfo.empName} - Discount Details
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <DiscountInfo info={dInfo} />
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <>
        <h3 className='text-center'>Discount Form Request</h3>
        {successCreate && (
          <Message variant='success'>Discount Registered Successfully</Message>
        )}
        {loadingCreate ? (
          <Loader />
        ) : (
          errorCreate && <Message variant='danger'>{errorCreate}</Message>
        )}

        {successUpdate && (
          <Message variant='success'>Discount Updated Successfully</Message>
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

            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-12 mx-auto'>
                {/* Employee Info */}
                <div className='row my-2 border border-secondary'>
                  <h5 className='text-center text-uppercase text-light  '>
                    Employee Info
                  </h5>
                  <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                    <div className='form-group'>
                      <label htmlFor=''>Emp. ID</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter your ID'
                        name='empId'
                        value={empId}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.empId && (
                        <div className='form-text text-danger'>
                          {errors.empId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                    <label htmlFor=''>Emp. Name</label>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter your name'
                        name='empName'
                        value={empName}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.empName && (
                        <div className='form-text text-danger'>
                          {errors.empName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                    <div className='form-group'>
                      <label htmlFor=''>Department</label>
                      <select
                        name='department'
                        value={department}
                        onChange={(e) => handleChange(e)}
                        className='form-control py-2'
                      >
                        <option value='' disabled>
                          Department...
                        </option>
                        {departments &&
                          departments.map((department) => {
                            return (
                              <option
                                key={department._id}
                                value={department._id}
                                onChange={(e) => handleChange(e)}
                              >
                                {department.name}
                              </option>
                            )
                          })}
                      </select>
                      {errors.department && (
                        <div className='form-text text-danger'>
                          {errors.department}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div className='row my-2 border border-secondary'>
                  <h5 className='text-center text-uppercase text-light  '>
                    Parent Info
                  </h5>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                    <div className='form-group'>
                      <label htmlFor=''>Father Name</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter your father name'
                        name='fatherName'
                        value={fatherName}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                    <label htmlFor=''>Mother Name</label>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter your mother name'
                        name='motherName'
                        value={motherName}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='genderSwitchCheckChecked'
                    name='isMale'
                    checked={isMale}
                    onChange={(e) =>
                      setFormData({ ...formData, isMale: !isMale })
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='genderSwitchCheckChecked'
                  >
                    Are you male?{' '}
                    <span role='img' aria-label='img'>
                      👨
                    </span>
                  </label>
                </div>

                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='statusSwitchCheckChecked'
                    name='isSingle'
                    checked={isSingle}
                    onChange={(e) =>
                      setFormData({ ...formData, isSingle: !isSingle })
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='statusSwitchCheckChecked'
                  >
                    Are you still single?{' '}
                    <span role='img' aria-label='img'>
                      😂
                    </span>
                  </label>
                </div>

                {!isSingle && (
                  <>
                    {isMale ? (
                      <>
                        {/* Wives Info */}
                        <div className='row my-2 border border-secondary'>
                          <h5 className='text-center text-uppercase text-light  '>
                            Wives Info
                          </h5>
                          <div className='col-12 '>
                            <label htmlFor=''>Wives Name</label>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the name of your wives'
                                name='wives'
                                value={wives}
                                onChange={(e) => handleChange(e)}
                                id='wives'
                              />
                              <div id='wives' className='form-text'>
                                Please use comma separated wives name if you
                                have more than one wife (eg.
                                Fatima,Zahra,Maria,Sophia)
                              </div>
                              {errors.wives && (
                                <div className='form-text text-danger'>
                                  {errors.wives}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Husband Info */}
                        <div className='row my-2 border border-secondary'>
                          <h5 className='text-center text-uppercase text-light  '>
                            Husband Info
                          </h5>
                          <div className='col-12 '>
                            <label htmlFor=''>Husband Name</label>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the name of your husband'
                                name='husband'
                                value={husband}
                                onChange={(e) => handleChange(e)}
                              />
                              {errors.husband && (
                                <div className='form-text text-danger'>
                                  {errors.husband}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className='form-check form-switch'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='childrenSwitchCheckChecked'
                        name='hasChildren'
                        checked={hasChildren}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasChildren: !hasChildren,
                          })
                        }
                      />
                      <label
                        className='form-check-label'
                        htmlFor='childrenSwitchCheckChecked'
                      >
                        Do you have any children?{' '}
                        <span role='img' aria-label='img'>
                          🧒
                        </span>
                      </label>
                    </div>

                    {hasChildren && (
                      <>
                        {/* Children Info */}
                        <div className='row my-2 border border-secondary'>
                          <h5 className='text-center text-uppercase text-light  '>
                            Children Info
                          </h5>
                          <div className='col-12 '>
                            <label htmlFor=''>Children's Name</label>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the name of your children'
                                name='children'
                                value={children}
                                onChange={(e) => handleChange(e)}
                                id='children'
                              />
                              <div id='children' className='form-text'>
                                Please use comma separated children's name if
                                you have more than one child (eg.
                                Mohamed,Fatima,Ahmed,Leila)
                              </div>
                              {errors.children && (
                                <div className='form-text text-danger'>
                                  {errors.children}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className='modal-footer'>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    </>
  )
}

export default DiscountScreen
