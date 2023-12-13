import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const PageNotFound = () => {
	return (
		<>
			<Navbar />
			<div className="d-flex justify-content-center align-items-center flex-column mt-5">
				<div className="text-center">
					<img src="/images/unauthorized.svg" alt="Unauthorized" />
					<div className="mt-5">
						<h1>You are unauthorized to access this page</h1>
						<h3 className="mt-4">Permission is required.</h3>
					</div>
				</div>
				<div className="mt-3">
					<Link to="/dashboard">
						<Button type="button" className="btn2 btn2-commit">
							Back to Dashboard
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
