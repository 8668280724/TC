import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
//  import EditIcon from '@mui/icons-material/Edit';
//  import DeleteIcon from '@mui/icons-material/Delete';
import data from '../mockData.json';
import ReadOnlyRows from "../Components/ReadOnlyRows";
import EditableRow from "../Components/EditableRow";

function Table() {
  const [rows, setRows] = useState(data);

  const [addFormData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
  });
  const [editFormData, setEditFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      firstname: addFormData.firstname,
      lastname: addFormData.lastname,
      mobilenumber: addFormData.mobilenumber,
      email: addFormData.email,
    };
    const newContacts = [...rows, newContact];
    setRows(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      mobilenumber: editFormData.mobilenumber,
      email: editFormData.email,
    };

    const newContacts = [...rows];

    const index = rows.findIndex((row) => row.id === editContactId);

    newContacts[index] = editedContact;

    setRows(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, row) => {
    event.preventDefault();
    setEditContactId(row.id);

    const formValues = {
      firstname: row.firstname,
      lastname: row.lastname,
      mobilenumber: row.mobilenumber,
      email: row.email,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...rows];

    const index = rows.findIndex((row) => row.id === contactId);

    newContacts.splice(index, 1);

    setRows(newContacts);
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      setRows((rows) => [
        ...rows,
        {
          firstname: "steven",
          lastname: "rogers",
          mobilenumber: "89289487374",
          email: "jkfhswhjw@gmail.com",
        },
      ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col overflow-x-auto shadow-lg justify-center">
      <form onSubmit={handleEditFormSubmit}>
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-6">
                      firstname
                    </th>
                    <th scope="col" className="px-6 py-6">
                      lastname
                    </th>
                    <th scope="col" className="px-6 py-6">
                      mobilenumber
                    </th>
                    <th scope="col" className="px-6 py-6">
                      email
                    </th>
                    <th scope="col" className="px-6 py-6">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <Fragment>
                      {editContactId === row.id ? (
                        <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick} />
                      ) : (
                        <ReadOnlyRows 
                        row={row}
                        handleEditClick={handleEditClick}
                         handleDeleteClick={handleDeleteClick}/>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
      <h2>Add Contacts</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="firstname"
          required="required"
          placeholder="Enter a firstname..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="lastname"
          required="required"
          placeholder="Enter an lastname..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="mobilenumber"
          required="required"
          placeholder="Enter a mobile number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

export default Table;
