import { useState } from "react";
import { UserDataContext } from "./UserDataContext";

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
