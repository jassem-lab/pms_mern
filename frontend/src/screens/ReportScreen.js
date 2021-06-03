import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listLeave } from '../actions/leaveActions'
import { listWriteUp } from '../actions/writeUpActions'
import LeaveReportScreen from './LeaveReportScreen'
import WriteUpReportScreen from './WriteUpReportScreen'

const ReportScreen = () => {
  const [search, setSearch] = useState('')
  const [reportType, setReportType] = useState('Leave Report')

  const dispatch = useDispatch()
  const leaveList = useSelector((state) => state.leaveList)
  const { leaves, error, loading } = leaveList

  const writeUpList = useSelector((state) => state.writeUpList)
  const { writeUps, error: writeUpError, loading: writeUpLoading } = writeUpList

  useEffect(() => {
    dispatch(listLeave())
    dispatch(listWriteUp())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const newSearchedLeaveArray =
    leaves &&
    leaves.filter(
      (lea) => lea.employee.employeeId.toLowerCase() === search.toLowerCase()
    )

  const newSearchedWriteUpArray =
    writeUps &&
    writeUps.filter(
      (write) =>
        write.employee.employeeId.toLowerCase() === search.toLowerCase()
    )

  return loading || writeUpLoading ? (
    <Loader />
  ) : error || writeUpError ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor='search'>Search Employee By ID</label>
        <div className='input-group mb-3'>
          <select
            className='btn border-1 border-light bt-sm dropdown-toggle'
            name='reportType'
            onChange={(e) => setReportType(e.target.value)}
            value={reportType}
          >
            <option value='Leave Report'>Leave Report</option>
            <option value='Write Up Report'>Write Up Report</option>
          </select>
          <input
            required
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            value={search}
            className='form-control '
            placeholder='e.g. YH-A###'
          />
        </div>
      </form>

      {reportType === 'Leave Report' ? (
        <LeaveReportScreen
          newSearchedLeaveArray={newSearchedLeaveArray}
          moment={moment}
          Moment={Moment}
        />
      ) : (
        <WriteUpReportScreen
          newSearchedWriteUpArray={newSearchedWriteUpArray}
          moment={moment}
          Moment={Moment}
        />
      )}
    </>
  )
}

export default ReportScreen
