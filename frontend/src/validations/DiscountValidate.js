export default function DiscountValidate(formData) {
  const {
    empId,
    empName,
    department,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = formData

  let errors = {}

  if (!empId) {
    errors.empId = 'Employee ID is required'
  } else if (!empName) {
    errors.empName = 'Employee Name is required'
  } else if (!department) {
    errors.department = 'Department is required'
  } else if (!isSingle && isMale && (!wives || wives[0] === '')) {
    errors.wives = 'Wife is required'
  } else if (!isSingle && !isMale && !husband) {
    errors.husband = 'Husband is required'
  } else if (hasChildren && !children) {
    errors.children = 'Child name is required'
  }
  return errors
}
