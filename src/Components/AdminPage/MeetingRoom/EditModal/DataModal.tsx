// import React from "react";
// import { Modal, Box } from "@mui/material";

// type DataModalProps = {
//     open: boolean;
//     onClose: () => void;
//     data:
//         | {
//               id: number;
//               title: string;
//               description: string;
//               lastBooked: string;
//           }[]
//         | null;
// };

// const DataModal: React.FC<DataModalProps> = ({ open, onClose, data }) => {
//     return (
//         <Modal open={open} onClose={onClose}>
//             <Box
//                 sx={{
//                     width: "80vw",
//                     height: "80vh",
//                     backgroundColor: "white",
//                     padding: "2rem",
//                 }}
//             >
//                 {data?.map((item, index) => (
//                     <div key={index}>
//                         <h2>{item.title}</h2>
//                         <p>{item.description}</p>
//                         <p>{item.lastBooked}</p>
//                     </div>
//                 ))}
//             </Box>
//         </Modal>
//     );
// };

// export default DataModal;
