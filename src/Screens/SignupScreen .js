import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import {Helmet} from 'react-helmet-async'

import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../Utils'
import http from '../axios'




export default function SignupScreen() {
  const navigate=useNavigate();
    // Pour signup
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl? redirectInUrl : '/';

    //email and password state
    const [Name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');

     const {state, dispatch:ctxDispatch}= useContext(Store);
     const {userInfo} = state;

    //la fonction submit  et prevenir l'evenement par défaut de l'evenement submit
    const submitHandler = async(e) => {
      e.preventDefault();
      if (password !== confirmpassword){
        toast.error('Password do not match');
        return;
      }
      try{
       const {data} = await http.post('/api/users/signup', {
        Name,
        email,
        password,
       });
       console.log(data)
       ctxDispatch({type: 'USER_SIGNUP', payload:data})
       localStorage.setItem('userInfo', JSON.stringify(data));
       navigate( '/shipping');
      }catch(err) {
        toast.error(getError(err));

      }
    };
    useEffect(()=>{   
    if(userInfo) {
      navigate(redirect );
    }
  },[navigate, redirect, userInfo] );
  return (
    // Formulaire de l'inscription du user'
    <Container className="small-container" style={{marginTop:'100px'}}>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='my-3'>Sign Up</h1>
      
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name"
       required 
       onChange={(e) => setName(e.target.value)}>
       </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email"
       required 
       onChange={(e) => setEmail(e.target.value)}>
       </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" 
      required
       onChange={(e) => setPassword(e.target.value)}>
       </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmpassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password"
       required 
       onChange={(e) => setConfirmPassword(e.target.value)}>
       </Form.Control>
      </Form.Group>
      <div className='mb-3'>
        <Button type="submit">Sign Up</Button>
      </div>
      <div className='mb-3'>
        Already have an account ?{''}
        <Link to={`/signup?redirect=${redirect}`}> Sign-In</Link>
      </div>
      </Form>
    </Container>
  )
}
