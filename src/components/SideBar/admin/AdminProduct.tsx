import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reducer/store/store";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
  createProduct,
} from "../../../reducer/actions/products/productSlice";
import { fetchCategories } from "../../../reducer/actions/categories/categorySlice";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  Button,
  Stack,
  TextField,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import "../../../css/index.css";
import AdminSideBar from "./AdminSideBar";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";


interface Product {
  _id: string;
  slug: string;
  title: string;
  image: File | null;
  description: string;
  category: string[];
  quantity: number;
  sold: number;
  shipping: number;
  price: number;
}


const AdminProduct = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const { showHideToast } = useToaster();

  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // Edit a Product
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editableProduct, setEditableProduct] = useState<Product>({
    _id: "",
    slug: "",
    title: "",
    image: null,
    description: "",
    category: [],
    quantity: 0,
    sold: 0,
    shipping: 0,
    price: 0,
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  

  const handleOpenModalEdit = (productId: string) => {
    const product = products.find((product) => product._id === productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    const updatedProduct: Product = {
      ...product,
      category: product.category.map((cat) => cat._id || cat),
    };


    setEditableProduct(updatedProduct);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  // const handleEditChange = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const { name, value } = event.target;

  //   if (name === "category") {
  //     setEditableProduct((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   } else if (name === "image" && event.target.files) {
  //     const file = event.target.files[0];
  //     setEditableProduct((prevState) => ({
  //       ...prevState,
  //       image: file,
  //     }));
  //   } else {
  //     setEditableProduct((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleEditChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target 

    if (name === "category") {
      setEditableProduct((prevState) => ({
        ...prevState,
        [name]: value as string[], 
      }));
    } else if (name === "image" && event.target.files) {
      const file = event.target.files[0];
      setEditableProduct((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setEditableProduct((prevState) => ({
        ...prevState,
        [name]: value, 
      }));
    }
  };
  


  const handleSaveEdit = async () => {
    const slug = editableProduct.slug;
    const formData = new FormData();

    formData.append("title", editableProduct.title);
    formData.append("description", editableProduct.description);
    formData.append("quantity", String(editableProduct.quantity));
    formData.append("price", String(editableProduct.price));
    formData.append("shipping", String(editableProduct.shipping));
    formData.append("sold", String(editableProduct.sold));

    if (Array.isArray(editableProduct.category)) {
      editableProduct.category.forEach((catId) => {
        formData.append("category", String(catId));
      });
    }

    if (editableProduct.image) {
      formData.append("image", editableProduct.image);
    }
    await dispatch(updateProduct({ slug: slug, productsData: formData }));
    setOpenModalEdit(false);
    dispatch(fetchProducts());
    showHideToast("Product updated successfully!", "success");
  };
  // Delete a product
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductSlug, setDeleteProductSlug] = useState<string | null>(
    null
  );

  const handleOpenDeleteDialog = (productSlug: string) => {
    setDeleteProductSlug(productSlug);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteProductSlug) {
      await dispatch(deleteProduct(deleteProductSlug));
      setOpenDelete(false);
      dispatch(fetchProducts());
      showHideToast("Product deleted successfully!", "success");
    }
  };
  // Create a new product
  const initialProductState = {
    _id: "",
    slug: "",
    title: "",
    image: null,
    description: "",
    category: [],
    quantity: 0,
    sold: 0,
    shipping: 0,
    price: 0,
  };

  const [openEditCreate, setOpenCreate] = useState(false);
  const [createNewProduct, setCreateNewProduct] = useState<Product>({
    _id: "",
    slug: "",
    title: "",
    image: null,
    description: "",
    category: [],
    quantity: 0,
    sold: 0,
    shipping: 0,
    price: 0,
  });
  function handleCloseCreate() {
    setOpenCreate(false);
  }
  function handleOpenCreate() {
    setOpenCreate(true);
  }
  const handleCreateChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;

    if (name === "category") {
      setCreateNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "image" && event.target.files) {
      const file = event.target.files[0];
      setCreateNewProduct((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setCreateNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  // Corrected handleSaveCreate function
  const handleSaveCreate = async () => {
    const formData = new FormData();
    // Append all necessary fields to formData
    formData.append("title", createNewProduct.title);
    formData.append("description", createNewProduct.description);
    formData.append("quantity", String(createNewProduct.quantity));
    formData.append("price", String(createNewProduct.price));
    formData.append("shipping", String(createNewProduct.shipping));
    formData.append("sold", String(createNewProduct.sold));
    createNewProduct.category.forEach((catId) => {
      formData.append("category", String(catId));
    });
    if (createNewProduct.image) {
      formData.append("image", createNewProduct.image);
    }

    // Dispatch the createProduct action with formData
    await dispatch(createProduct(formData));
    handleCloseCreate();
    dispatch(fetchProducts());
    showHideToast("Product created successfully!", "success");

    setCreateNewProduct(initialProductState);
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
  //             {error}
  //           </Typography>
  //         </p>
  //       </Box>
  //     </Box>
  //   );
  if (!products)
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
              No products found!
            </Typography>
          </p>
        </Box>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: matches ? "row" : "column" }}>
      {/* <Box sx={{ flexBasis: "300px" }}> */}
      <AdminSideBar />
      {/* </Box> */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography variant="h4" gutterBottom>
            Product List
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
          {products.map((product) => (
            <ListItem key={product._id} alignItems="flex-start">
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}>
                <CardMedia
                  sx={{ width: 160 }}
                  image={product.image || "public/images/default.png"}
                  title={product.title}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Price: ${product.price}
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
                      onClick={() => handleOpenModalEdit(product._id)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(product.slug)}>
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>
        {/* Edit */}
        <Dialog
          open={openModalEdit}
          onClose={handleCloseModalEdit}
          fullWidth
          maxWidth="md">
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <Container>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={editableProduct?.title || ""}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                minRows={3}
                value={editableProduct?.description || ""}
                onChange={handleEditChange}
              />
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleEditChange}
                />
              </Button>
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={editableProduct?.price || ""}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                name="quantity"
                type="number"
                value={editableProduct?.quantity || ""}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Shipping"
                name="shipping"
                type="number"
                value={editableProduct?.shipping}
                onChange={handleEditChange}
                helperText="Enter a shipping option as a number."
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={editableProduct.category || []}
                  onChange={handleEditChange}
                  inputProps={{
                    name: "category",
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((categoryId) => {
                        const category = categories.find(
                          (c) => c._id === categoryId
                        );
                        return (
                          <Chip
                            key={categoryId}
                            label={category ? category.title : categoryId}
                            sx={{ bgcolor: "secondary.main", color: "white" }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflow: "auto",
                      },
                    },
                  }}
                  sx={{
                    ".Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  }}>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Sold"
                name="sold"
                type="number"
                value={editableProduct?.sold || ""}
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
                  onClick={handleCloseModalEdit}>
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
        {/* Delete */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description">
          <DialogTitle id="delete-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this product? This action cannot
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
        {/* Create */}
        <Dialog
          open={openEditCreate}
          onClose={handleCloseCreate}
          fullWidth
          maxWidth="md">
          <DialogTitle>Create Product</DialogTitle>
          <DialogContent>
            <Container>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={createNewProduct?.title || ""}
                onChange={handleCreateChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                minRows={3}
                value={createNewProduct?.description || ""}
                onChange={handleCreateChange}
              />
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleCreateChange}
                />
              </Button>
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={createNewProduct?.price || ""}
                onChange={handleCreateChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                name="quantity"
                type="number"
                value={createNewProduct?.quantity || ""}
                onChange={handleCreateChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Shipping"
                name="shipping"
                type="number"
                value={createNewProduct?.shipping}
                onChange={handleCreateChange}
                helperText="Enter a shipping option as a number."
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={createNewProduct.category || []}
                  onChange={handleCreateChange}
                  inputProps={{
                    name: "category",
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((categoryId) => {
                        const category = categories.find(
                          (c) => c._id === categoryId
                        );
                        return (
                          <Chip
                            key={categoryId}
                            label={category ? category.title : categoryId}
                            sx={{ bgcolor: "secondary.main", color: "white" }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflow: "auto",
                      },
                    },
                  }}
                  sx={{
                    ".Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  }}>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Sold"
                name="sold"
                type="number"
                value={createNewProduct?.sold || ""}
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

export default AdminProduct;
