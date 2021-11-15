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


export default function DomainManage() {
    
    let navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if(id != undefined && id > 0){
            FetchDomain();
        }
        return () => {
        }
    }, []);

    const [Domain, setDomain] = useState({
        id: "",
        domainName: "",
        Type: "",
        domainChair: "",
        localTPM: "",
        product: "",
        domainClass: "",
        request: ""
    });

    const FetchDomain = async () => {
        const result = await axios.get(`http://localhost:8081/api/domain/getDomainById/${id}`);
        setDomain(result.data);
    };

    const onInputChange = e => {
         setDomain({ ...Domain, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if(id != undefined && id > 0){
            await axios.put(`http://localhost:8081/api/domain/updateDomain/${id}`, Domain);
            navigate('/domains')
        }else{
            await axios.post("http://localhost:8081/api/domain/saveDomain", Domain);
            navigate('/domains')
        }
    };
    

  const {  domainName,type, localTPM,product,domainClass, request } = Domain;

  return (
    
    <Container maxWidth="lg">
        <Box mt={2}>
            <h3>Domain Manage</h3>
        </Box>
        <Box p={3}  sx={{'& > :not(style)': { m: 1, width: '25ch' }}, {backgroundColor: '#fff'}}
        noValidate autoComplete="off">
            <form onSubmit={e => onSubmit(e)}>
                <Grid container spacing={2} mb={1.5}>
                    <Grid item xs={6}>
                        <TextField fullWidth id="domainName" name="domainName" label="Domain Name" 
                         value={domainName} onChange={e => onInputChange(e)}
                         variant="outlined" required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="type" name="type" label="Type"
                         value={type} onChange={e => onInputChange(e)} required> 
                            <MenuItem value="Software" selected>Software</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="localTPM" name="localTPM" label="Local TPM" 
                        value={localTPM} onChange={e => onInputChange(e)}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="product" name="product" label="Product" 
                        value={product} onChange={e => onInputChange(e)}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="domainClass" name="domainClass" label="Domain Class" 
                        value={domainClass} onChange={e => onInputChange(e)}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="request" name="request" label="Request" 
                        value={request} onChange={e => onInputChange(e)}
                        variant="outlined" />
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