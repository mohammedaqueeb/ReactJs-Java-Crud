import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@material-ui/core/Box";
import { IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProductList() {
  const [products, setProduct] = useState([]);

  let navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    ProductList();
  }, []);

  const ProductList = async () => {
    const result = await axios.get("http://localhost:3003/products");
    setProduct(result.data.reverse());
  };

  const deleteUser = async (id) => {
    var shouldDelete = window.confirm(
      "Do you really want to delete this domain?"
    );
    if (shouldDelete) {
      await axios.delete(`http://localhost:3003/products/${id}`);
      ProductList();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box m={2} pt={3}>
        <h3 className="mb-3">
          Product List{" "}
          <Button
            variant="contained"
            component={Link}
            to="/product-manage"
            className="float-right"
          >
            ADD PRODUCT
          </Button>{" "}
        </h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense  table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Domain Name </TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{product.DomainName}</TableCell>
                  <TableCell align="left">{product.ProductName}</TableCell>
                  <TableCell align="left">{product.Type}</TableCell>
                  <TableCell align="left">{product.Status}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      component={Link}
                      to={`/product-manage/${product.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
