import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from './Store';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import MessageBox from './Components/MessageBox';
import { Link,useNavigate } from 'react-router-dom';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import  Button from 'react-bootstrap/Button'
import  Card from 'react-bootstrap/Card';
import axios from 'axios';



 function CartScreen() {
    const navigate =useNavigate()

    const {state, dispatch :ctxDispatch} = useContext(Store);

    const {
        cart: {cartItems},
    } = state;
    const updateCartHandler = async (item,quantity) => {
        const {data} = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock < quantity){
            window.alert('sorry. Product is out of stock');
            return;
          }
          ctxDispatch ({
            type:'CART_ADD_ITEM',
            payload: {...item, quantity},
        });
    };
    const removeItemHandler = (item) =>{
     ctxDispatch({type:'CART_REMOVE_ITEM', payload:item});
    };
const checkoutHandler= () => {
    // Naviguer sur la page signin pour l'utilisateur s'authenfit s'il s'authentifit on doit le rediriger  automatiquement sur la page shippin
    //To redirect the user, you need to use the Navigate component. Note that this component replaced the Redirect component used in React Router v5.
    //if (!authenticated) {
//   return <Navigate replace to="/login" />;
// } else {
//   return (
//     <div>
//       <p>Welcome to your Dashboard</p>
//     </div>
//   );
// }
    navigate('/signin?redirect=/shipping');
   
}



  return (
    <div style={{marginTop:'100px'}}>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
            {cartItems.length === 0 ? (
                <MessageBox>
                    Cart is empty. <Link to = "/" Go Shopping></Link>
                </MessageBox>
            ):
            (
                <ListGroup>
                    {cartItems.map((item) =>(   
                        <ListGroupItem key={item._id}>
                            <Row className='align-items-center'>
                                <Col md={4}>
                                 <img 
                                 src={item.Image}
                                 alt={item.Name}
                                 className="img-fluid rounded img-thumbnail"
                                 ></img>{""}
                                 <Link className='color' to={`/product/${item.slug}`}> {item.Name} </Link>
                                </Col>
                                <Col md={3}>
                                    <Button 
                                    onClick={() =>
                                        updateCartHandler(item, item.quantity - 1) 
                                    } 
                                    variant="light" disabled={item.quantity ===1}> {/* Laisser le nombre de auantité des articles à 1 arrivé à ce stade on peut pas plus diminuer la quantité */}
                                        <i className='fas fa-minus-circle'></i>
                                    </Button>{""}
                                    <span>{item.quantity} </span>{""}
                                    <Button 
                                    variant="light"
                                     onClick={() =>updateCartHandler(item, item.quantity + 1)}
                                     disabled = {item.quantity === item.countInStock}
                                    >  
                                    <i className='fas fa-plus-circle'></i>
                                    </Button>
                                </Col>
                                <Col md= {3}>{item.prix} FCFA </Col>
                                <Col md={2}>
                                <Button 
                                onClick={() => removeItemHandler(item)}
                                variant="light">
                                        <i className='fas fa-trash'></i>
                                    </Button>

                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )
            }
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant='flush'>
                        {/* /Pour calculer la somme total des produits mis dans le pagner */}
                     <h3>
                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{""}
                       items):
                       {cartItems.reduce((a, c) => a + c.prix * c.quantity , 0) } FCFA
                     </h3>
                    </ListGroup>
                    <div className='d-grid'>
                        <Button
                        type='button'
                        variant='primary'
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  );
}
export  default CartScreen;
