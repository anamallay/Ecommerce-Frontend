import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { AppDispatch, RootState } from "../../../reducer/store/store";
import { useDispatch, useSelector } from "react-redux";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";
import {
  createCategories,
  deleteCategories,
  fetchCategories,
  updateCategories,
} from "../../../reducer/actions/categories/categorySlice";

interface EditableCategory {
  title: string;
  id?: number; // Use optional if ID might not be present initially
}

const AdminCategory = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const { showHideToast } = useToaster();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCategorySlug, setDeleteCategorySlug] = useState<string | null>(
    null
  );

  const handleOpenDelete = (productSlug: string) => {
    setDeleteCategorySlug(productSlug);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteCategorySlug) {
      await dispatch(deleteCategories(deleteCategorySlug));
      setOpenDelete(false);
      dispatch(fetchCategories());
      showHideToast("Product deleted successfully!", "success");
    }
  };
  // Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editableCategory, setEditableCategory] = useState<EditableCategory>({
    title: "",
  });

  const handleOpenEdit = (categorySlug: string) => {
    const categoryToEdit = categories.find(
      (category) => category._id.toString() === categorySlug
    );

    if (categoryToEdit) {
      setEditableCategory({
        title: categoryToEdit.title,
        id: categoryToEdit._id,
      });
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (editableCategory.id) {
      await dispatch(
        updateCategories({
          id: editableCategory.id.toString(), // Convert number to string
          categoryData: { title: editableCategory.title },
        })
      );
      dispatch(fetchCategories());
      setOpenEdit(false);
      showHideToast("Category updated successfully!", "success");
    } else {
      showHideToast("Error finding category ID", "error");
    }
  };

  // Create
  const [openCreate, setOpenCreate] = useState(false);
  const [createCategory, setCreateCategory] = useState({
    title: "",
  });
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCreate = async () => {
    await dispatch(createCategories({ title: createCategory.title }));
    dispatch(fetchCategories());
    setOpenCreate(false);
    showHideToast("Category Created successfully!", "success");
  };

  if (isLoading) return <CircularColor />;
  console.log("error", error);
  if (error)
    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexBasis: "300px" }}>
          <AdminSideBar />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
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
            Error loading categories!
          </Typography>
        </Box>
      </Box>
    );
  if (!categories)
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
              No categories found!
            </Typography>
          </p>
        </Box>
      </Box>
    );

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexBasis: "300px" }}>
        <AdminSideBar />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography variant="h4" gutterBottom>
            Categories List
          </Typography>
          <AddBoxTwoToneIcon
            color="primary"
            style={{
              marginRight: "16px",
              fontSize: "40px",
              cursor: "pointer",
            }}
            onClick={() => handleOpenCreate()}
          />
        </div>
        <List>
          {categories.map((category) => (
            <ListItem key={category._id} alignItems="flex-start">
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
                    <Typography gutterBottom variant="h5" component="div">
                      {category.title}
                    </Typography>
                  </CardContent>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    p={2}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEdit(category._id.toString())}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDelete(category._id.toString())}>
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>
        {/* Delete */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description">
          <DialogTitle id="delete-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} autoFocus>
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* Edit */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth
          maxWidth="md">
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <Container>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={editableCategory?.title || ""}
                onChange={handleEditChange}
              />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCloseEdit}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveEdit}>
                  Save
                </Button>
              </Stack>
            </Container>
          </DialogContent>
        </Dialog>
        {/* Create */}
        <Dialog
          open={openCreate}
          onClose={handleCloseCreate}
          fullWidth
          maxWidth="md">
          <DialogTitle>Create Category</DialogTitle>
          <DialogContent>
            <Container>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={createCategory.title || ""}
                onChange={handleCreateChange}
              />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCloseCreate}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveCreate}>
                  Save
                </Button>
              </Stack>
            </Container>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminCategory;
