import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios'

import { Store } from '../Store';


 function Product(props) {
    const{product}= props;
    const {state, dispatch :ctxDispatch} = useContext(Store);

    const {
        cart: {cartItems},
    } = state;
    const addToCartHandler = async (item) => {
      const existItem = cartItems.find((x) => x._id ===product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
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



  return (
    
     <Card className="product" key={product.slug}> {/* Ceci permet de donner une clé unique pour chaque produit */}
              {/* Link is a component from react router dom that can replace a Link=a and href=to */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.Image}className="card-img-top" alt={product.Name}/>
                </Link>
            <Card.Body> 
                <Link className='link' to={`/product/${product.slug}`}> 
                  {/* Ceci permet d'afficher le name du produit */} 
                    <Card.Title className='titre'> <p > {product.Name}</p></Card.Title> 
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                  {/* Ceci permet d'afficher le prix du produit */}
                    <Card.Text> <p><strong>{product.prix} FCFA</strong></p></Card.Text>
                    {/* La condition si le stock de produit est égale à 0 creer un button et mettew out of stock */}
                    {product.countInStock=== 0? <Button variant='danger'>Out of stock</Button>
                    :
                    <Button  onClick={() => addToCartHandler(product)} className='btn-default'>Add to  card</Button>
                  }

                   
            </Card.Body> 
        </Card>
    
  );
}
export default Product;