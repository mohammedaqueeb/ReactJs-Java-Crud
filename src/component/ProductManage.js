import React, { useState , useEffect } from "react";
import Box from '@mui/material/Box';
import axios from 'axios';
import {Input, TextField, InputLabel} from '@mui/material';
import Container from '@mui/material/Container';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray
  } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import {Button, Select , MenuItem  } from '@mui/material';


export default function ProductManage() {
    
    let navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if(id != undefined && id > 0){
            FetchProduct();
        }
        BindDomain();
        return () => {
        }
    }, []);

    const [Domain, setDomain] = useState([]);

    const [Product, setProduct] = useState({
        id: "",
        DomainId: 0,
        DomainName: "",
        ProductName: "",
        Type: "",
        Description: "",
        Vendor: "",
        ClassificationReason: "",
        Status: "",
        CreatedAt: ""
    });

    const FetchProduct = async () => {
        const result = await axios.get(`http://localhost:3003/products/${id}`);
        setProduct(result.data);
    };

    const BindDomain = async () => {
        const result = await axios.get(`http://localhost:3003/domain`);
        setDomain(result.data);
    };

    const onInputChange = e => {
         setProduct({ ...Product, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        if(id != undefined && id > 0){
            await axios.put(`http://localhost:3003/products/${id}`, Product);
            navigate('/Products')
        }else{
            await axios.post("http://localhost:3003/products", Product);
            navigate('/Products')
        }
    };
    

  const {  ProductName,Type, DomainName,Description,Vendor,ClassificationReason } = Product;

  return (
    
    <Container maxWidth="lg">
        <Box mt={2}>
            <h3>Product Manage</h3>
        </Box>
        <Box p={3}  sx={{'& > :not(style)': { m: 1, width: '25ch' }}, {backgroundColor: '#fff'}}
        noValidate autoComplete="off">
            <form onSubmit={e => onSubmit(e)}>
                <Grid container spacing={2} mb={1.5}>

                    <Grid item xs={6}>
                        <TextField fullWidth id="ProductName" name="ProductName" label="ProductName" 
                         value={ProductName} onChange={e => onInputChange(e)} variant="outlined" required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="Type" name="Type" label="Type"
                         value={Type} onChange={e => onInputChange(e)} required> 
                            <MenuItem value="Software" selected>Software</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="DomainName" name="DomainName" label="Domain Name" 
                        value={DomainName} onChange={e => onInputChange(e)} required>
                            {
                                Domain.map((domain, index) => (
                                    <MenuItem key={index} value={domain.id}>{domain.Name}</MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>
                   
                    <Grid item xs={6}>
                        <TextField fullWidth select id="Vendor" name="Vendor" label="Vendor" 
                        value={Vendor} onChange={e => onInputChange(e)} required>
                            <MenuItem value="Level 1" selected>Level 1</MenuItem>
                            <MenuItem value="Level 2" selected>Level 2</MenuItem>
                            <MenuItem value="Level 3" selected>Level 3</MenuItem>
                            <MenuItem value="Level 4" selected>Level 4</MenuItem>
                            <MenuItem value="Level 5" selected>Level 5</MenuItem>
                            <MenuItem value="Level 6" selected>Level 6</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="Description" name="Description" label="Description" 
                        value={Description} onChange={e => onInputChange(e)}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="ClassificationReason" name="ClassificationReason" label="Classification Reason" 
                        value={ClassificationReason} onChange={e => onInputChange(e)} variant="outlined" />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />} className="float-right"> Submit </Button>
                    </Grid>
                </Grid>
          </form>
        </Box>
    </Container>
  );
}
