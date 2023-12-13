import React from "react";
import { useDispatch } from "react-redux";
import { exportMasterList } from "../actions/masters";
import { openModal } from "../actions/modal";
import { importModalName } from "./import/ImportModal";

const TableOptions = ({
  masterName,
  modalName,
  addMaster,
  showAdd = true,
  showImport = true,
  showExport = true,
}) => {
  const dispatch = useDispatch();

  const handleImportMaster = () =>
    dispatch(openModal(importModalName, { masterName }));

  const handleExportMaster = () => dispatch(exportMasterList(masterName));

  const handleAddMaster = () => {
    if (addMaster) {
      addMaster();
    } else {
      dispatch(openModal(modalName));
    }
  };

  return (
    <div className="d-flex flex-row justify-content-between p-3">
      <h1 style={{ textTransform: "capitalize" }}>{masterName} List</h1>
      <div className="flex-grow-1"></div>
      <>
        {showAdd && (
          <button
            className="btn btn-success ms-3 align-self-center"
            style={{ borderRadius: "10px", height: "40px", width: "140px" }}
            type="button"
            onClick={handleAddMaster}
          >
            Add{" "}
            <span style={{ textTransform: "capitalize" }}>{masterName}</span>
          </button>
        )}
        {showImport && (
          <button
            className="btn btn-success ms-3 align-self-center"
            style={{ borderRadius: "10px", height: "40px", width: "140px" }}
            type="button"
            onClick={handleImportMaster}
          >
            Import
          </button>
        )}
        {showExport && (
          <button
            className="btn btn-success ms-3 align-self-center"
            style={{ borderRadius: "10px", height: "40px", width: "150px" }}
            type="button"
            onClick={handleExportMaster}
          >
            Export To Excel
          </button>
        )}
      </>
    </div>
  );
};

export default TableOptions;
