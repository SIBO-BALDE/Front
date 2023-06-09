import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import {Helmet} from 'react-helmet-async'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../Utils'
import axios from 'axios'




export default function SigninScreen() {
  const navigate=useNavigate();
    // Pour signuin
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl? redirectInUrl : '/';

    //email and password state
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
     const {state, dispatch:ctxDispatch}= useContext(Store);
     const {userInfo} = state;

    //Signin button
    const submitHandler = async(e) => {
      e.preventDefault();
      try{
       const {data} = await axios.post('/api/users/signin', {
        email,
        password,
       });
       console.log(data)
       ctxDispatch({type: 'USER_SIGNIN', payload:data})
       localStorage.setItem('userInfo', JSON.stringify(data));
       navigate( '/shipping');
      }catch(err) {
        toast.error(getError(err));

      }
    };
    useEffect(()=>{   
    if(userInfo) {
      navigate('/shipping' );
    }
  },[navigate, redirect, userInfo] );
  return (
    // Formulaire de connection du user'
    <Container className="small-container" style={{marginTop:'100px'}}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form onSubmit={submitHandler}>
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
      <div className='mb-3'>
        <Button type="submit">Sign In</Button>
      </div>
      <div className='mb-3'>
        New Customer?{''}
        <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
      </div>
      </Form>
    </Container>
  )
}
