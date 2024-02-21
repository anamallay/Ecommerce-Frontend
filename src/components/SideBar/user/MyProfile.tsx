import React, { useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
import UserSideBar from "./UserSideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../reducer/store/store";
import { Updateusers } from "../../../reducer/actions/users/usersSlice";
import { useToaster } from "../../../contexts/ToasterProvider";

const MyProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const { showHideToast } = useToaster();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formUserData, setFormUserData] = useState({
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
  });

  console.log("userData", userData);
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateNameClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData && userData._id) {
      const updateUserDate = { _id: userData._id, ...formUserData };
      console.log("updateUserDate", updateUserDate);
      await dispatch(Updateusers(updateUserDate));
      showHideToast("Profile Updated successfully!", "success");
      setIsFormOpen(false);
    } else {
      console.error("User data is undefined or missing an ID.");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexBasis: "300px" }}>
        <UserSideBar />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box
          sx={{
            bgcolor: "primary.light",
            p: 6, // shorthand for padding, equivalent to '60px'
            borderRadius: 2, // default theme spacing, consider adjusting for your theme or using raw values like '10px'
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Your Profile
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Profile Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold", mb: 1 }}>
                First Name:{" "}
                <Box component="span" sx={{ fontWeight: "normal" }}>
                  {formUserData.first_name}
                </Box>
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold", mb: 1 }}>
                Last Name:{" "}
                <Box component="span" sx={{ fontWeight: "normal" }}>
                  {formUserData.last_name}
                </Box>
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold", mb: 1 }}>
                Email:{" "}
                <Box component="span" sx={{ fontWeight: "normal" }}>
                  {userData.email}
                </Box>
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold" }}>
                Role:{" "}
                <Box component="span" sx={{ fontWeight: "normal" }}>
                  {userData.isAdmin ? "Admin" : "User"}
                </Box>
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleUpdateNameClick}
              sx={{ mt: 3 }}>
              Update Name
            </Button>
          </Box>
        </Box>
        <Modal open={isFormOpen} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Profile
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  autoComplete="fname"
                  autoFocus
                  value={formUserData.first_name}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  value={formUserData.last_name}
                  onChange={handleFormChange}
                />
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MyProfile;
