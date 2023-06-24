import React, { Fragment, useEffect, useReducer } from 'react';
//import { useState } from 'react';

import {  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Helmet } from 'react-helmet-async';
import Carroussel from '../Carroussel';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../config/axios';


// On vas commenter le produit data parrceque c'est un statique data du frontend
//import data from '../data';
//We will fetch the data from the backend  to the frontend
// For fetch data in the backend to the frontend we will use axios
// we install this in frontend folder
 
// Le useReducer hooks est utilisé pour stocker et mettre à jour les états, tout comme le useState hooks. 
// Il accepte une reducer fonction comme premier paramètre et l'état initial comme second.
// useReducer renvoie un tableau contenant la valeur de l'état actuel et une dispatch fonction
//(qui vous permet de mettre à jour le state à une valeur différente et de déclencher un nouveau rendu.)
// à laquelle vous pouvez transmettre une action et l'invoquer ultérieurement. 
// Bien que cela soit similaire au modèle utilisé par Redux, il existe quelques différences.
// Par exemple, la useReducer fonction est étroitement couplée à un réducteur spécifique. 
// Nous distribuons les objets d'action à ce réducteur uniquement, alors que dans Redux,
//  la fonction de répartition envoie l'objet d'action au magasin. 
//  Au moment de l'expédition, les composants n'ont pas besoin de savoir quel réducteur traitera l'action.

 const reducer = (state, action) =>{
  switch(action.type){
    case'FETCH_REQUEST':
    return{...state, loading:true};
    case'FETCH_SUCCESS':
    return{...state, products:action.payload,loading:false};
    case'FETCH_FAIL':
    return{...state, loading:false,error:action.payload};
    default:
      return state;
    
  }
 };
 function HomeScreen() {
  // Fetch the data
  //Un Hook est une fonction qui permet de « se brancher » sur des fonctionnalités React.
  // Par exemple, useState est un Hook qui permet d’ajouter l’état local React à des fonctions composants.
  //Auparavant, si vous écriviez une fonction composant et que vous réalisiez que vous aviez besoin d’un état local à l’intérieur, vous deviez la convertir en classe.
  // Désormais vous pouvez utiliser un Hook à l’intérieur de votre fonction composant.

  //  On utilise useEffect pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage. 
  //React enregistre la fonction passée en argument (que nous appellerons « effet »), et l’appellera plus tard, après avoir mis à jour le DOM.
  //Il accept deux parametre une functin et un array(tableau)
  // On remplace le useState par useReducer
  //We use use-reduder-logger  to change the state  in react
  const[{loading, error, products}, dispatch] = useReducer(reducer, {
    products: [],
    loading:true, 
    error:'',
  })
 // const [products, setProducts] = useState([]);
  useEffect(() => {
       
     const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try{
        const result = await axiosInstance.get('/products');
        dispatch({type: 'FETCH_SUCCESS', payload:result.data });
      }catch(err){
        dispatch({type: 'FETCH_FAIL', payload:err.message});

      }
      
      //setProducts(result.data);
     };
     // The callbak function for the async function
     fetchData();
  }, []);
  return (
   
    <div className='products-screen'style={{msScrollSnapPointsX:'inherit'}}>
      <Carroussel />
      <Container className='mt-3' >
        <Helmet>
         <title>La loincloth</title> 
        </Helmet>
        
       
          <h1 className='titre'>Produits:</h1>
          <div className='backgroud-image'>
           {/* les proxy permet de se connecter sur adresss étranger à ton lieu d'habitat c'est à dire davoir une 
           adress au canada alors qu'on réside en Afrique 
           Le server proxy est un server intermediaire qui permet à un utilisateur d'acceder à internet*/}
         
              <div className="products">
                        {/* Ceci permet de copier le tableau déclarer dans data.js vers cet div */}
                        {/* CONDITION à faire */}
                     
              { loading ? (
                <LoadingBox />
                ) : error ? (
                <MessageBox variant="danger"> {error} </MessageBox>
                ) : (
                 
                <Row>
             {/*data.*/products?.map((product) => {
              return <Col  key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
               </Col>
             })
    
            }
              </Row> ) 
         }
       
            </div>
          
            </div>
            </Container>
    </div>
      
  )
};
export default HomeScreen;