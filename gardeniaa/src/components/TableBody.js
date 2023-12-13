import React from "react";
import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field } from "redux-form";
import { getIsFetchingMasterList } from "../reducers/master";
import { ReduxFormTextField } from "../utils/ReduxFormTextField";

const TableBody = ({ tableHeaders, renderTableBody }) => {
	const isLoading = useSelector(getIsFetchingMasterList);
	return (
		<Table striped bordered>
			<thead>
				<tr>
					{tableHeaders?.map(header => (
						<th key={header?.value}>{header.label}</th>
					))}
					<th>Actions</th>
				</tr>
				<tr>
					{tableHeaders?.map(header => (
						<th key={header?.value}>
							<Field
								component={ReduxFormTextField}
								name={header?.value}
								placeholder={`Search ${header?.label}`}
							/>
						</th>
					))}
					<th>
						<button type="submit" className="btn btn-primary">
							Search
						</button>
					</th>
				</tr>
			</thead>
			{isLoading ? (
				<tbody>
					<tr>
						<td colSpan={tableHeaders?.length + 1} style={{ border: "none" }}>
							<div
								className="d-flex flex-grow-1 justify-content-center align-items-center"
								style={{ height: "40vh" }}
							>
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							</div>
						</td>
					</tr>
				</tbody>
			) : (
				<tbody>{renderTableBody()}</tbody>
			)}
		</Table>
	);
};

export default TableBody;
