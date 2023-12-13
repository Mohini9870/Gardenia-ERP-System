// import React from "react";
// import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import { addMasterList, editMasterList } from "../../../actions/masters";
// import { closeModal } from "../../../actions/modal";
// import { getActiveModal } from "../../../reducers/modals";
// import UpdateStockForm from "./UpdateStockForm";

// const masterName = "updatestockmaster";
// export const updatestockModalName = "updatestockmasterModal";

// const UpdatestockModal = () => {
//   const dispatch = useDispatch();

//   const activeModal = useSelector(getActiveModal);
//   const open = activeModal?.name === updatestockModalName;
//   const data = activeModal?.data || {};

//   const handleSubmit = (formData) => {
//     if (data?.id) {
//       dispatch(editMasterList(masterName, formData, data?.id));
//     } else {
//       dispatch(addMasterList(masterName, formData));
//     }
//   };

//   const handleClose = () => {
//     dispatch(closeModal(updatestockModalName));
//   };

//   return (
//     <Modal
//       show={open}
//       onHide={handleClose}
//       backdrop="static"
//       keyboard={false}
//       centered
//       size="xl"
//     >
//       <UpdateStockForm
//         title={
//           !!data?.isViewOnly
//             ? data?.name
//             : `${data?.id ? "Edit" : "Add"} Hqmaster`
//         }
//         onSubmit={handleSubmit}
//         onCancel={handleClose}
//         initialValues={{
//           distributor: data?.distributor,
//           month: data?.month,
//           year: data?.year,
//           regionList: data?.regionList?.map((region) => region?.value),
//         }}
//         isViewOnly={!!data?.isViewOnly}
//       />
//     </Modal>
//   );
// };

// export default UpdatestockModal;

// // import React from "react";
// // import Modal from "react-bootstrap/Modal";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addMasterList, editMasterList } from "../../../actions/masters";
// // import { closeModal } from "../../../actions/modal";
// // import { getActiveModal } from "../../../reducers/modals";
// // import UpdateStockForm from "./UpdateStockForm";

// // const masterName = "updatestock";
// // export const updatstockModalName = "updatestockModal";

// // const UpdatestockModal = () => {
// //   const dispatch = useDispatch();

// //   const activeModal = useSelector(getActiveModal);
// //   const open = activeModal?.name === updatstockModalName;
// //   const data = activeModal?.data || {};

// //   const handleSubmit = (formData) => {
// //     if (data?.id) {
// //       dispatch(editMasterList(masterName, formData, data?.id));
// //     } else {
// //       dispatch(addMasterList(masterName, formData));
// //     }
// //   };

// //   const handleClose = () => {
// //     dispatch(closeModal(updatstockModalName));
// //   };

// //   return (
// //     <Modal
// //       show={open}
// //       onHide={handleClose}
// //       backdrop="static"
// //       keyboard={false}
// //       centered
// //       size="xl"
// //     >
// //       <UpdateStockForm
// //         title={
// //           !!data?.isViewOnly
// //             ? data?.name
// //             : `${data?.id ? "Edit" : "Add"} Updatestock`
// //         }
// //         onSubmit={handleSubmit}
// //         onCancel={handleClose}
// //         initialValues={{
// //           distributor: data?.distributor,
// //           month: data?.month,
// //           year: data?.year,
// //           regionList: data?.regionList?.map((region) => region?.value),
// //         }}
// //         isViewOnly={!!data?.isViewOnly}
// //       />
// //     </Modal>
// //   );
// // };

// // export default UpdatestockModal;
