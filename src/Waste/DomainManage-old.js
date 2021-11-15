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
        Name: "",
        Type: "",
        ProductGroup: "",
        Description: "",
        DomainLevel: "",
        DomainChair: "",
        DomainProxy: "",
        DomainMembers: "",
        SiteURL: "",
        CreatedAt: ""
    });

    const FetchDomain = async () => {
        const result = await axios.get(`http://localhost:3003/domain/${id}`);
        setDomain(result.data);
    };

    const onInputChange = e => {
         setDomain({ ...Domain, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        Domain.CreatedAt = yyyy + '-' + mm + '-' + dd;

        if(id != undefined && id > 0){
            await axios.put(`http://localhost:3003/domain/${id}`, Domain);
            navigate('/domains')
        }else{
            await axios.post("http://localhost:3003/domain", Domain);
            navigate('/domains')
        }
    };
    

  const {  Name,Type, ProductGroup,Description,DomainLevel,DomainChair,DomainProxy,DomainMembers,SiteURL } = Domain;

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
                        <TextField fullWidth id="Name" name="Name" label="Name" 
                         value={Name} onChange={e => onInputChange(e)}
                         variant="outlined" required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="Type" name="Type" label="Type"
                         value={Type} onChange={e => onInputChange(e)} required> 
                            <MenuItem value="Software" selected>Software</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="ProductGroup" name="ProductGroup" label="Product Group" 
                        value={ProductGroup} onChange={e => onInputChange(e)} required>
                            <MenuItem value="Database Products" selected>Database Products</MenuItem>
                            <MenuItem value="Middleware Products">Middleware Products</MenuItem>
                            <MenuItem value="Servers Software">Servers Software</MenuItem>
                            <MenuItem value="Development Tool">Development Tool</MenuItem>
                            <MenuItem value="Reporting Products">Reporting Products</MenuItem>
                            <MenuItem value="Security Products">Security Products</MenuItem>
                            <MenuItem value="Remote Hosting">Remote Hosting</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="Description" name="Description" label="Description" 
                        value={Description} onChange={e => onInputChange(e)}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="DomainLevel" name="DomainLevel" label="Domain Level" 
                        value={DomainLevel} onChange={e => onInputChange(e)} required>
                            <MenuItem value="Level 1" selected>Level 1</MenuItem>
                            <MenuItem value="Level 2" selected>Level 2</MenuItem>
                            <MenuItem value="Level 3" selected>Level 3</MenuItem>
                            <MenuItem value="Level 4" selected>Level 4</MenuItem>
                            <MenuItem value="Level 5" selected>Level 5</MenuItem>
                            <MenuItem value="Level 6" selected>Level 6</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="DomainChair" name="DomainChair" label="Domain Chair" 
                        value={DomainChair} onChange={e => onInputChange(e)} required>
                            <MenuItem value="Aqueeb Shaikh" selected>Aqueeb Shaikh</MenuItem>
                            <MenuItem value="Deepanshu Tiwari" >Deepanshu Tiwari</MenuItem>
                            <MenuItem value="Siddhaling Dapure" >Siddhaling Dapure</MenuItem>
                            <MenuItem value="Ashutosh Adarsh" >Ashutosh Adarsh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth select id="DomainProxy" name="DomainProxy" label="Domain Proxy" 
                        value={DomainProxy} onChange={e => onInputChange(e)}  required  >
                            <MenuItem value="Aqueeb Shaikh" selected>Aqueeb Shaikh</MenuItem>
                            <MenuItem value="Deepanshu Tiwari" >Deepanshu Tiwari</MenuItem>
                            <MenuItem value="Siddhaling Dapure" >Siddhaling Dapure</MenuItem>
                            <MenuItem value="Ashutosh Adarsh" >Ashutosh Adarsh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="DomainMembers" name="DomainMembers" label="Domain Members" 
                        value={DomainMembers} onChange={e => onInputChange(e)} variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="SiteURL" name="SiteURL" label="Site URL" 
                        value={SiteURL} onChange={e => onInputChange(e)} variant="outlined" />
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