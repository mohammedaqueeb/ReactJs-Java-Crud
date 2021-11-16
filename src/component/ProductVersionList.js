import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@material-ui/core/Box';
import {IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function ProductVersionList() {

    const [Versions, setVersion] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        VersionList();
    }, []);

    const VersionList = async () =>{
        const result = await axios.get("http://localhost:8081/api/CtcVersion/list");
        setVersion(result.data);
    }

    const deleteUser = async id => {
      var shouldDelete = window.confirm('Do you really want to delete this domain?');
      if (shouldDelete) {
        await axios.delete(`ht//localhost:8081/api/CtcVersion/delete?versionId=${id}`);
        VersionList();
      } 
    };

  return (
    <Container maxWidth="lg">
    <Box m={2} pt={3}>
    
    <h3 className="mb-3">Version List <Button variant="contained" component={Link} to="/product-version-manage" className="float-right">ADD PRODUCT VERSION</Button> </h3>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense  table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Type </TableCell>
            <TableCell align="left">Product Domain</TableCell>
            <TableCell align="left">Vendor Name</TableCell>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">Platform</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                Versions.map((version, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>   
                        <TableCell align="left">{version.productType}</TableCell>
                        <TableCell align="left">{version.productDomain}</TableCell>
                        <TableCell align="left">{version.vendorName}</TableCell>
                        <TableCell align="left">{version.productName}</TableCell>
                        <TableCell align="left">{version.platform}</TableCell>
                        
                        <TableCell align="left">
                            <IconButton component={Link} to={`/domain-manage/${version.ctcVersionId}`}  aria-label="delete"><EditIcon /></IconButton>
                            <IconButton onClick={() => deleteUser(version.ctcVersionId)}  aria-label="delete"><DeleteIcon /></IconButton>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Container>
  );
}