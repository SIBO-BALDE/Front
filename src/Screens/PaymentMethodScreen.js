import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../Components/CheckoutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {shippingAdress, paymentMethod},
    }=state;
    const [paymentMethodName,setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );
    useEffect(() => {
        if (!shippingAdress.adress) {
            navigate('/shipping');
        }
    }, [shippingAdress,navigate])
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethodName});
        localStorage.setItem('paymentMethod',paymentMethodName);
        navigate('/placeorder');
    }
  return <div>
     <CheckoutSteps step1 step2 step3></CheckoutSteps>
     <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <div className='mb-3'>
            <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            cheked={paymentMethodName === 'PayPal'}
            onChange= {(e) => setPaymentMethod(e.target.value)}
            
            ></Form.Check>
            <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            cheked={paymentMethodName === 'Stripe'}
            onChange= {(e) => setPaymentMethod(e.target.value)}
            
            ></Form.Check>
        </div>
        <Button type="submit">Continue</Button>
        </Form>
        </div>    
    </div>;
  
}
