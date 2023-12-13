import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../reducers/user";

const ProtectedRoute = ({ children }) => {
	const userDetails = useSelector(getUserDetails);

	return (userDetails?.isLoggedIn && userDetails?.token) === false ? (
		<Navigate to="/login" replace />
	) : (
		children
	);
};

export default ProtectedRoute;
