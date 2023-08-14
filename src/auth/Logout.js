import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      sx={{ m: "10px" }}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};

export default Logout;
