import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import AdminSideBar from "./AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reducer/store/store";
import { useState, useEffect } from "react";
import {
  banUser,
  deleteUser,
  fetchUsers,
  unbanUser,
} from "../../../reducer/actions/users/usersSlice";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";

const AdminUserlist = () => {
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch: AppDispatch = useDispatch();
  const { showHideToast } = useToaster();
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit })).then((response) => {
      console.log("fetchUsers response:", response);
      const { pageInfo } = response.payload;

      if (pageInfo) {
        setTotalPages(pageInfo.totalPages);
      }
    });
  }, [dispatch, page, limit]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  // Delete user

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  function handleOpenDelete(userId: string) {
    setDeleteUserId(userId);
    setOpenDelete(true);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteUserId) {
      await dispatch(deleteUser(deleteUserId));
      setOpenDelete(false);
      dispatch(fetchUsers({ page, limit })).then((response) => {
        const { pageInfo } = response.payload;

        if (pageInfo) {
          setTotalPages(pageInfo.totalPages);
        }
      });
      showHideToast("User deleted successfully!", "success");
    }
  };

  const handleBan = async (_id: string) => {
    await dispatch(banUser(_id));
    dispatch(fetchUsers({ page, limit })).then((response) => {
      const { pageInfo } = response.payload;
      if (pageInfo) {
        setTotalPages(pageInfo.totalPages);
      }
    });
    showHideToast("User banned successfully!", "success");
  };

  const handleUnban = async (_id: string) => {
    await dispatch(unbanUser(_id));
    dispatch(fetchUsers({ page, limit })).then((response) => {
      const { pageInfo } = response.payload;

      if (pageInfo) {
        setTotalPages(pageInfo.totalPages);
      }
    });
    showHideToast("User unbanned successfully!", "success");
  };

  if (isLoading) return <CircularColor />;
  // if (error)
  //   return (
  //     <Box sx={{ display: "flex" }}>
  //       <Box sx={{ flexBasis: "300px" }}>
  //         <AdminSideBar />
  //       </Box>
  //       <Box sx={{ flexGrow: 1, overflow: "auto" }}>
  //         <p>
  //           <Typography
  //             sx={{
  //               height: "100vh",
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //             variant="h4"
  //             color="error"
  //             gutterBottom>
  //             Error loading users!
  //           </Typography>
  //         </p>
  //       </Box>
  //     </Box>
  //   );
  if (!users)
    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexBasis: "300px" }}>
          <AdminSideBar />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <p>
            <Typography
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="h4"
              color="error"
              gutterBottom>
              No users found!
            </Typography>
          </p>
        </Box>
      </Box>
    );

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexBasis: "200px" }}>
        <AdminSideBar />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>
        <List>
          {(users.payload ?? []).map((user) => (
            <ListItem key={user._id} alignItems="flex-start">
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography gutterBottom variant="text" component="div">
                      {user.email}
                    </Typography>
                    <Typography gutterBottom variant="text" component="div">
                      Role: {user.isAdmin ? "Admin" : "User"}
                    </Typography>
                  </CardContent>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    p={2}>
                    {user.isBanned ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleUnban(user._id)} // Unban a banned user
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleBan(user._id)} // Ban an unbanned user
                      >
                        Block
                      </Button>
                    )}

                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDelete(user._id)}>
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
      {/* Delete */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description">
        <DialogTitle id="delete-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUserlist;

