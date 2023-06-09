import React, { useContext, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getError } from '../Utils';
import { toast } from 'react-toastify';
import axios from 'axios';



export default function ProfileScreen() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {userInfo} = state;
  const [Name,setName] = useState(userInfo.Name);
  const [email,setEmail] = useState(userInfo.email);
  const [password,setPassWord] = useState('');
  const [confirmpassword,setConfirmPassWord] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
          return {...state, loadingUpdate:true};
        case 'UPDATE_SUCCESS':
          return {...state, loadingUpdate:false};
        case 'UPDATE_FAIL':
          return {...state, loadingUpdate:false};
          default:
            return state;
  }
}

  
  const [{loadingUpdate}, dispatch] = useReducer(reducer , {
     loadingUpdate:false
  });
  const submitHandler = async (e) => {
    //pour eviter le rafraichissement par défaut de la fonction
    e.preventDefault();
    try{
        const {data} = await axios.put(
            '/api/users/profile',
          
            {
              Name,
              email,
              password,
            },
            {
              headers:{authorization: `Bearer ${userInfo.token}`},
            }
        
          );
          dispatch({
            type:'UPDATE_SUCCESS',
          });
          ctxDispatch({type: 'USER_SIGNIN', payload:data});
          localStorage.setItem('userInfo',JSON.stringify(data));
          toast.success('User Update Successfully'); 
    }catch (err) {
    dispatch({

        type: 'FETCH_FAIL'
    });
        toast.error(getError(err));
      }

  };
  return (
    <div className='container small-container' style={{marginTop:'100px'}}>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <h1 className='my-3'>User Profile</h1>
        <form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                value={ Name}
                onChange={(e)=> setName(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>PassWord</Form.Label>
                <Form.Control
                type="password"
                onChange={(e)=> setPassWord(e.target.value)}
               
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmpassword'>
                <Form.Label>Confirm PassWord</Form.Label>
                <Form.Control
                type="confirmpassword"
                onChange={(e)=> setConfirmPassWord(e.target.value)} 
                >
                </Form.Control>
            </Form.Group>
            <div className='"mb-3'>
                <Button type="submit">Update</Button>
            </div>
        </form>
    </div>
  );
}
