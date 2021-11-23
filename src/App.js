import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NotFound from "./common/NotFound";
import DomainList from "./component/DomainList";
import DomainManage from "./component/DomainManage";
import Dashboard from "./component/Dashboard";
import Navbar from "./common/Navbar";
import DomainManageFormik from "./Waste/DomainManageFormik";
import ProductList from "./component/ProductList";
import ProductManage from "./component/ProductManage";
import ProductVersionList from "./component/ProductVersionList";
import ProductVersionManage from "./component/ProductVersionManage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container maxWidth="lg">
          <Box mt={4} mb={4}>
            <Routes>
              <Route exact="true" path="/" element={<Dashboard />} />
              <Route exact="true" path="/domains" element={<DomainList />} />
              <Route
                exact="true"
                path="/domain-manage"
                element={<DomainManage />}
              />
              <Route
                exact="true"
                path="/domain-manage-1"
                element={<DomainManageFormik />}
              />
              <Route
                exact="true"
                path="/domain-manage/:id"
                element={<DomainManage />}
              />

              <Route exact="true" path="/products" element={<ProductList />} />
              <Route
                exact="true"
                path="/product-manage"
                element={<ProductManage />}
              />
              <Route
                exact="true"
                path="/product-manage/:id"
                element={<ProductManage />}
              />

              <Route
                exact="true"
                path="/product-version"
                element={<ProductVersionList />}
              />
              <Route
                exact="true"
                path="/product-version-manage"
                element={<ProductVersionManage />}
              />
              <Route
                exact="true"
                path="/product-version-manage/:id"
                element={<ProductVersionManage />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Container>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
