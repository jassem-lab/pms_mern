import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import PrivateRoute from '../routes/PrivateRoute'
import AdminPrivateRoute from '../routes/AdminPrivateRoute'
import DepartmentScreen from '../../screens/DepartmentScreen'
import PositionScreen from '../../screens/PositionScreen'
import DiscountScreen from '../../screens/DiscountScreen'
import EmployeeScreen from '../../screens/EmployeeScreen'
import LeaveScreen from '../../screens/LeaveScreen'
import ReportScreen from '../../screens/ReportScreen'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import WriteUpScreen from '../../screens/WriteUpScreen'
import ResignScreen from '../../screens/ResignScreen'
import PayrollScreen from '../../screens/PayrollScreen'

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <PrivateRoute
          path='/admin/users/logs'
          component={UserLogHistoryScreen}
        />
        <Route path='/register' component={RegisterScreen} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
        <AdminPrivateRoute path='/department' component={DepartmentScreen} />
        <AdminPrivateRoute path='/position' component={PositionScreen} />
        <Route path='/report' component={ReportScreen} />
        <AdminPrivateRoute path='/resign/:id?' component={ResignScreen} />
        <Route path='/leave/:id?' component={LeaveScreen} />
        <Route path='/write-up/:id?' component={WriteUpScreen} />
        <Route path='/discount' component={DiscountScreen} />
        <AdminPrivateRoute path='/employee' component={EmployeeScreen} />
        <AdminPrivateRoute path='/payroll' component={PayrollScreen} />
        <AdminPrivateRoute
          exact
          path='/admin/users'
          component={UserListScreen}
        />
        <AdminPrivateRoute
          path='/admin/users/page/:pageNumber'
          component={UserListScreen}
        />

        <AdminPrivateRoute exact path='/' component={HomeScreen} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
