import React, { useState , useEffect } from "react";
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import {Button } from '@mui/material';
import { Input, OutlinedInput, } from "@mui/material";

const initialValues = {
    name: 'Software',
    email: '',
    channel: ''
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    channel: Yup.string().required('Required')
})

export default function DomainManage() {
    
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      })

  return (
    
    <Container maxWidth="lg">
        <Box mt={2}>
            <h3>Domain Manage</h3>
        </Box>
        <Box p={3}  sx={{backgroundColor: '#fff'}} autoComplete="off">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} mb={1.5}>
                    <Grid item xs={6}>
                        <label htmlFor="">Name</label>
                        <OutlinedInput fullWidth variant="outlined"   id='name' name='name' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.name}  />
                        {formik.touched.name && formik.errors.name ? 
                        ( <div className='error'>{formik.errors.name}</div> ) : null}
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined"   id='name' name='name' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.name}  />
                        {formik.touched.name && formik.errors.name ? 
                        ( <div className='error'>{formik.errors.name}</div> ) : null}
                    </Grid>
                    
                    <Grid item xs={6}>
                        <OutlinedInput fullWidth variant="outlined"   id='email' name='email' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.email}  />
                        {formik.touched.email && formik.errors.email ? 
                        ( <div className='error'>{formik.errors.email}</div> ) : null}
                    </Grid>

                    <Grid item xs={12}>
                        <Button type='submit' variant="contained" endIcon={<SendIcon />} className="float-right"> Submit </Button>
                    </Grid>
                </Grid>
                </form>
        </Box>
    </Container>
  );
}