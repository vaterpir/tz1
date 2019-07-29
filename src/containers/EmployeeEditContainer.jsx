import React from "react";
import { connect } from "react-redux";

import EmployeeEdit from "../components/EmployeeEdit.jsx";
import { editEmployee } from "../actions/employees";

const EmployeesContainer = props => {
	const { employees, editEmployee } = props;
	const id = props.match.params.id;

	return <EmployeeEdit employee={employees[id]} handler={editEmployee} />;
};

const mapStateToProps = state => ({
	employees: state.employees.employees
});

const mapDispatchToProps = dispatch => ({
	editEmployee: data => dispatch(editEmployee(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmployeesContainer);