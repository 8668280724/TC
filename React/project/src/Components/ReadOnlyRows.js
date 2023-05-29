import React from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRows = ({ row, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap px-6 py-6">{row.firstname}</td>
      <td className="whitespace-nowrap px-6 py-6">{row.lastname}</td>
      <td className="whitespace-nowrap px-6 py-6">{row.mobilenumber}</td>
      <td className="whitespace-nowrap px-6 py-6">{row.email}</td>
      <td className="whitespace-nowrap px-6 py-6">
        <button type="button" onClick={(event) => handleEditClick(event, row)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(row.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRows;
