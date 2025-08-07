import React, { useRef,useState,useEffect } from "react";

function UseRefFormExample() {

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const [userList,setUserList] = useState([]);
  const [editUser,setEditUser] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    if(!username,!email) return alert("enter the valid data");
    const userData = {username,email};

    if (editUser !== null) {
     const updatedUsers = [...userList];
      updatedUsers[editUser] = userData;
      setUserList(updatedUsers);
      setEditUser(null);   
    } else {
      setUserList([...userList, userData]);  
    }

    // 4️⃣ Clear input fields
    usernameRef.current.value = "";
    emailRef.current.value = "";
  };

    const handleEdit = (index) => {
    const user = userList[index];
    usernameRef.current.value = user.username;
    emailRef.current.value = user.email;
    setEditUser(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = userList.filter((_, i) => i !== index);
    setUserList(updatedUsers);
    if (editUser === index) setEditUser(null);
  };


  return (
    <div style={styles.parent}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Add User</h3>
        <div>
          <label>Username:</label>
          <input type="text" ref={usernameRef} />
        </div>

        <div>
          <label>email :</label>
          <input type="email" ref={emailRef} />
        </div>
        <div style={styles.buttonHead}>
          <button type="submit" style={styles.button}>
           {editUser !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>

        <div style={styles.list}>
        <h4>User List</h4>
        {userList.length === 0 && <p>No users added yet.</p>}
        {userList.map((user, index) => (
          <div key={index} style={styles.item}>
            <span>{user.name} - {user.email}</span>
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.delBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  parent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full screen height
    backgroundColor: "#f0f0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    gap: "15px",
    minWidth: "300px",
  },
  buttonHead: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100px",
    borderRadius: "10px",
    borderWidth: "1px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
  },
   list: {
    marginTop: "30px",
    backgroundColor: "#fff",
    color: "#000",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "320px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px"
  },
  editBtn: {
    marginRight: "10px",
    backgroundColor: "#ffb703",
    border: "none",
    padding: "5px",
    cursor: "pointer"
  },
  delBtn: {
    backgroundColor: "#ef233c",
    border: "none",
    color: "#fff",
    padding: "5px",
    cursor: "pointer"
  }
};

export default UseRefFormExample;
