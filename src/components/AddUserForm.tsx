const AddUserForm = () => {
  return (
    <form onSubmit={userCreation}>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <input
        type="text"
        value={newUserPassword}
        onChange={(e) => setNewUserPassword(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default AddUserForm;
