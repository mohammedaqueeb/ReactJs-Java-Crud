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

export default function DomainList() {
  const [domains, setDomain] = useState([]);

  const MySwal = withReactContent(Swal);

  let navigate = useNavigate();

  useEffect(() => {
    DomainList();
  }, []);

  const DomainList = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_PATH}domain/getAllDomain`
    );
    setDomain(result.data);
  };

  const SweetAlert = (id) => {
    MySwal.fire({
      title: "Are you sure to delete?",
      text: "But you will still be able to retrieve this file.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff1b1b",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((willDelete) => {
      if (willDelete.isConfirmed == true) {
        deleteUser(id);
      }
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_PATH}domain/deleteDomain/${id}`
    );
    DomainList();
    // var shouldDelete = window.confirm(
    //   "Do you really want to delete this domain?"
    // );
    // if (shouldDelete) {
    //   await axios.delete(
    //     `${process.env.REACT_APP_API_PATH}CtcVersion/delete?versionId=${id}`
    //   );
    //   DomainList();
    // }
  };

  return (
    <Container maxWidth="lg">
      <Box m={2} pt={3}>
        <h3 className="mb-3">
          Domain List{" "}
          <Button
            variant="contained"
            component={Link}
            to="/domain-manage"
            className="float-right"
          >
            ADD DOMAIN
          </Button>{" "}
        </h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense  table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Domain Name </TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Domain Chair</TableCell>
                <TableCell align="left">Request</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {domains.map((domain, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{domain.domainName}</TableCell>
                  <TableCell align="left">{domain.type}</TableCell>
                  <TableCell align="left">{domain.domainChair}</TableCell>
                  <TableCell align="left">{domain.request}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      component={Link}
                      to={`/domain-manage/${domain.domainId}`}
                      aria-label="delete"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => SweetAlert(domain.domainId)}
                      aria-label="delete"
                    >
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
