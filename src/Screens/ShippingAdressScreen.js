import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import  Button from 'react-bootstrap/Button'
import { Navigate, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../Components/CheckoutSteps';

export default function ShippingAdressScreen() {
    const navigate = useNavigate();
    const {state,dispatch: ctxDispatch} = useContext(Store)
    const {
        userInfo,
        cart : {shippingAdress},
    }=state;

    const [fullName, setFullName] = useState( shippingAdress.fullName ||'');
    const [adress, setAdress] = useState(shippingAdress.adress ||'');
    const [city, setCity] = useState(shippingAdress.city ||'');
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode ||'');
    const [country, setCountry] = useState(shippingAdress.country ||'');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);



    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type:'SAVE_SHIPPING_ADRESS',
            payload: {
                fullName,
                adress,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem(
            'shippingAdress',
            JSON.stringify({
                fullName,
                adress,
                city,
                postalCode,
                country,

            })
        );
        navigate('/payment');
    };
  return  <div>
    <Helmet>
        <title>Shipping Adress</title>
    </Helmet>
    <CheckoutSteps step1 step2></CheckoutSteps>
    <div className=' container small-container'>
    <h1 className='my-3'>Shipping Adress</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        
        />
        </Form.Group>
        <Form.Group className='mb-3' controlId='address' />
        <Form.Label>Adress</Form.Label>
        <Form.Control
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
        required
        />
         <Form.Group className='mb-3' controlId='city' />
        <Form.Label> City</Form.Label>
        <Form.Control
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        
        />
         <Form.Group className='mb-3' controlId='postalCode' />
        <Form.Label> Postal Code</Form.Label>
        <Form.Control
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
        
        />
         <Form.Group className='mb-3' controlId='country' />
        <Form.Label>  Country</Form.Label>
        <Form.Control
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        
        />{''}
        <div className='mb-3'>
            <Button variant='primary' type='submit'>Continue</Button>
        </div>

    </Form>


    </div>
   
    </div>;
  
}
