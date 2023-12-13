import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../actions/masters";
import { closeModal } from "../actions/modal";
import { getActiveModal } from "../reducers/modals";
import Hqform from "./hqform";

const masterName = "hqmaster";
export const hqModalName = "hqmasterModal";

const Hqmodal = () => {
  const dispatch = useDispatch();

  const activeModal = useSelector(getActiveModal);
  const open = activeModal?.name === hqModalName;
  const data = activeModal?.data || {};

  const handleSubmit = (formData) => {
    if (data?.id) {
      dispatch(editMasterList(masterName, formData, data?.id));
    } else {
      dispatch(addMasterList(masterName, formData));
    }
  };

  const handleClose = () => {
    dispatch(closeModal(hqModalName));
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="xl"
    >
      <Hqform
        title={
          !!data?.isViewOnly
            ? data?.name
            : `${data?.id ? "Edit" : "Add"} Hqmaster`
        }
        onSubmit={handleSubmit}
        onCancel={handleClose}
        initialValues={{
          hqName: data?.hqName,
          hqCode: data?.hqCode,
          hqDesignation: data?.hqDesignation,
          regionList: data?.regionList?.map((region) => region?.value),
        }}
        isViewOnly={!!data?.isViewOnly}
      />
    </Modal>
  );
};

export default Hqmodal;
