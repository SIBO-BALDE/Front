import React, { useContext, useEffect, useReducer } from 'react'
import Axios from 'axios'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../Components/CheckoutSteps'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { Store } from '../Store'
import ListGroup from 'react-bootstrap/ListGroup'
import {getError} from '../Utils';
import {toast} from 'react-toastify'
import LoadingBox from '../Components/LoadingBox';
 const reducer = (state,action) => {
    switch (action.type){
        case 'CREATE_REQUEST':
            return {...state, loading: true};
        case 'CREATE_SUCCESS':
            return {...state, loading: false};
        case 'CREATE_FAIL':
            return {...state, loading: false};
            default:
                return state;
    }
 }

export default function PlaceOderScreen() {
    const navigate =useNavigate();
    const [{loading},dispatch]= useReducer(reducer,{
        loading:false,
       
    }
    );
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart,userInfo} =state;
    console.log({userInfo})
    const round2 = (num) => Math.round(num* 100 + Number.EPSILON)/ 100;
    cart.itemsPrix = round2(
        cart.cartItems.reduce((a,c) => a + c.quantity * c.prix, 0)
    );
    cart.shippingPrix = cart.itemsPrix > 100 ? round2(0) : round2(10);
    cart.taxPrix = round2 (0.15 * cart.itemsPrix);
    cart.totalPrix = cart.itemsPrix + cart.shippingPrix + cart.taxPrix;

    const PlaceOderHandler= async ()=> {

        try {
        dispatch({type:'CREATE_REQUEST'});
        const {data} = await Axios.post(
            '/api/orders',
            {
                orderItems:cart.cartItems,
                shippingAdress:cart.shippingAdress,
                paymentMethod:cart.paymentMethod,
                itemsPrix:cart.itemsPrix,
                shippingPrix:cart.shippingPrix,
                taxPrix:cart.taxPrix,
                totalPrix:cart.totalPrix,
            },
            {
                headers:{
                    authorization:`Bearer ${userInfo.token}`,
                },
            }
        );
        ctxDispatch({type:'CART_CLEAR'});
        ctxDispatch({type:'CREAT_SUCCESS'});
        localStorage.removeItem('cartItems');
        navigate(`/order/${data.order._id}`);

        }catch (err) {
            dispatch({type:'CREATE_FAIL'});
            toast.error(getError(err));
        }
        useEffect(() => {
            if(!cart.paymentMethod){
                navigate('/payment');
            }
        },[cart, navigate]);
    }
  return  <div>
           <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
           <Helmet>
            <title>Preview Order</title>
           </Helmet>
           <h1 className='my-3'>Preview Order</h1>
           <Row>
            <Col md={8}>
               <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                        <strong>Name</strong>{cart.shippingAdress.fullName}<br/>
                        <strong>Adress</strong>{cart.shippingAdress.adress},
                        {cart.shippingAdress.city},{cart.shippingAdress.postalCode},
                        {cart.shippingAdress.country}
                    </Card.Text>
                    <Link to="/shipping">Edit</Link>

                </Card.Body>
               </Card>
               <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                        <strong>Methode:</strong>{cart.paymentMethod}
                    </Card.Text>
                    <Link to="/payment">Edit</Link>
                </Card.Body>
               </Card>
               <Card className='mb-3'>
                <Card.Body>
                <Card.Title>items</Card.Title>
                <ListGroup variant="flush">
                 {cart.cartItems.map((item) =>(
                   <ListGroup.Item key={item._id} >
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <img
                            src={item.Image} 
                            alt={item.Name} 
                            className="img-fluid rounded img-thumbnail"
                            ></img>
                            <Link to={`/produt/${item.slug}`}> {item.Name} </Link>
                        </Col >
                        <Col md={3}>
                            <span> {item.quantity} </span>
                        </Col>
                        <Col md={3}> {item.prix}FCFA</Col>


                    </Row>
                  </ListGroup.Item>
                )
                )}
               </ListGroup>
               <Link to="/cart">Edit</Link>
                </Card.Body>
               </Card>  
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.itemsPrix.toFixed(2)}FCFA </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col> {cart.shippingPrix.toFixed(2)}FCFA </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> {cart.taxPrix.toFixed(2)}FCFA </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                      <strong>Order Total</strong>
                                    </Col>
                                    <Col>
                                      <strong>{cart.taxPrix.toFixed(2)}FCFA</strong>  
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className='d-grid'>
                                    <Button
                                    type="button"
                                    onClick={PlaceOderHandler}
                                    disabled={cart.cartItems.length === 0}
                                    >
                                        Place Order
                                    </Button>
                                </div>
                                {loading && <LoadingBox></LoadingBox>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>

           </Row>  
    </div>
  
}
