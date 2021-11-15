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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DomainList() {

    const [domains, setDomain] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        DomainList();
    }, []);

    const DomainList = async () =>{
        const result = await axios.get("http://localhost:3003/domain");
        setDomain(result.data.reverse());
    }

    const deleteUser = async id => {
        
      var shouldDelete = window.confirm('Do you really want to delete this domain?');
      if (shouldDelete) {
        await axios.delete(`http://localhost:3003/domain/${id}`);
        DomainList();
      }
        
    };

  return (
    <Container maxWidth="lg">
    <Box m={2} pt={3}>
    
    <h3 className="mb-3">Domain List <Button variant="contained" component={Link} to="/domain-manage" className="float-right">ADD DOMAIN</Button> </h3>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense  table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Domian Name </TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Product Group</TableCell>
            <TableCell align="left">Domain Level</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                domains.map((domain, index) => (
                    <TableRow key={domain.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>   
                        <TableCell align="left">{domain.Name}</TableCell>
                        <TableCell align="left">{domain.Type}</TableCell>
                        <TableCell align="left">{domain.ProductGroup}</TableCell>
                        <TableCell align="left">{domain.DomainLevel}</TableCell>
                        <TableCell align="left">
                            <IconButton component={Link} to={`/domain-manage/${domain.id}`}  aria-label="delete"><EditIcon /></IconButton>
                            <IconButton onClick={() => deleteUser(domain.id)}  aria-label="delete"><DeleteIcon /></IconButton>
                            
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