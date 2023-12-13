import React from "react";
import { Link } from "react-router-dom";
import { APPROVED, PENDING, REJECTED } from "../utils/masterActions";

const Statuses = ({ masterName, status }) => {
	return (
		<div className="d-flex justify-content-center mb-3">
			<Link to={`/${masterName}s/${APPROVED}`}>
				<button
					type="button"
					className={
						status === APPROVED
							? "btn btn-success action-buttons color-white"
							: "btn btn-outline-success action-buttons"
					}
					style={{
						borderRadius: "20px 0px 0px 20px",
					}}
				>
					Approved
				</button>
			</Link>
			<Link to={`/${masterName}s/${REJECTED}`}>
				<button
					type="button"
					className={
						status === REJECTED
							? "btn btn-success action-buttons color-white"
							: "btn btn-outline-success action-buttons"
					}
					style={{
						borderRadius: "0",
					}}
				>
					Rejected
				</button>
			</Link>
			<Link to={`/${masterName}s/${PENDING}`}>
				<button
					type="button"
					className={
						status === PENDING
							? "btn btn-success action-buttons color-white"
							: "btn btn-outline-success action-buttons"
					}
					style={{
						borderRadius: "0px 20px 20px 0px",
					}}
				>
					Pending
				</button>
			</Link>
		</div>
	);
};

export default Statuses;
