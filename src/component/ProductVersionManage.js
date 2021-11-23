import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { Input, TextField, InputLabel } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { Button, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductVersionManage() {
  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined && id > 0) {
      FetchVersion();
    }
    return () => {};
  }, []);

  const [Version, setVersion] = useState({
    ctcVersionId: "",
    productType: "",
    productDomain: "",
    vendorName: "",
    productName: "",
    platform: "",
    licenseScheme: "",
    description: "",
    language: "",
    partNo: "",
    estimateCost: "",
    justification: "",
  });

  const FetchVersion = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_PATH}CtcVersion/getVersionInfoById?versionId=${id}`
    );
    setVersion(result.data);
  };

  const onInputChange = (e) => {
    setVersion({ ...Version, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (id != undefined && id > 0) {
      await axios.put(
        `${process.env.REACT_APP_API_PATH}CtcVersion/update?versionId=${id}`,
        Version
      );
      navigate("/product-version");
    } else {
      await axios.post(`${process.env.REACT_APP_API_PATH}CtcVersion`, Version);
      navigate("/product-version");
    }

    toast.success("Product Version Saved!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const {
    ctcVersionId,
    productType,
    productDomain,
    vendorName,
    productName,
    platform,
    licenseScheme,
    description,
    language,
    partNo,
    estimateCost,
    justification,
  } = Version;

  return (
    <Container maxWidth="lg">
      <Box mt={2}>
        <h3>Version Manage</h3>
      </Box>
      <Box
        p={3}
        sx={
          ({ "& > :not(style)": { m: 1, width: "25ch" } },
          { backgroundColor: "#fff" })
        }
        noValidate
        autoComplete="off"
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2} mb={1.5}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="productType"
                name="productType"
                label="product Type"
                value={productType}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="productDomain"
                name="productDomain"
                label="product Domain"
                value={productDomain}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="vendorName"
                name="vendorName"
                label="vendor Name"
                value={vendorName}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="productName"
                name="productName"
                label="product Name"
                value={productName}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="platform"
                name="platform"
                label="platform"
                value={platform}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="licenseScheme"
                name="licenseScheme"
                label="license Scheme"
                value={licenseScheme}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="description"
                value={description}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="language"
                name="language"
                label="language"
                value={language}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="partNo"
                name="partNo"
                label="partNo"
                value={partNo}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="estimateCost"
                name="estimateCost"
                label="estimate Cost"
                value={estimateCost}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="justification"
                name="justification"
                label="justification"
                value={justification}
                onChange={(e) => onInputChange(e)}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                className="float-right"
              >
                {" "}
                Submit{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
