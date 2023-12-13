import React from "react";
import Table from "react-bootstrap/Table";
const UpdateStockIvoice = () => {
  return (
    <>
      {" "}
      <Table
        striped
        bordered
        hover
        size="sm"
        className="w-75 mt-3"
        style={{ marginLeft: "8rem" }}
      >
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Month</th>
            <th>Year</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default UpdateStockIvoice;
