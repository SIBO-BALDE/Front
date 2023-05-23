
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../Components/Rating";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../Utils";
import { Store } from "../Store";
import http from "../axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//To get slug from the url et showing in the Screen
//Pour obtenir le slug  (id) de l'url et l'afficher à l'écran
//on utilise le useParams pour sa

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  console.log({ loading, error, product });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    //L’idée principale  de l’asynchrone est que le reste du script puisse continuer à s’exécuter pendant qu’une certaine opération plus longue ou demandant une réponse / valeur est en cours.
    // Cela permet un affichage plus rapide des pages et en une meilleure expérience utilisateur.
    //Le premier outil utilisé en JavaScript pour générer du code asynchrone a été les fonctions de rappel.
    //En effet, une fonction de rappel ou « callback » en anglais est une fonction qui va pouvoir être rappelée (« called back ») à un certain moment et / ou si certaines conditions sont réunies.
    //L’idée ici est de passer une fonction de rappel en argument d’une autre fonction.
    //Cette fonction de rappel va être rappelée à un certain moment par la fonction principale et pouvoir s’exécuter, sans forcément bloquer le reste du script tant que ce n’est pas le cas.
    //fetchData is a async funtion,Un objet Set permet de stocker un ensemble de valeurs uniques de n'importe quel type, qu'il s'agisse de valeurs primitives ou d'objets.
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await http.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      //setProducts(result.data);
    };
    // The callbak function for the async function
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    // Ici on vérifiet si l'item exist dans le pagner si c'est le cas on augmente juste la quantité et l'item elle meme sinon on ajoute l'item
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await http.get(`/api/products/${product._id}`);
    // If la quantité in the stock is less thant added in the cart alert this message:'sorry. Product is out of stock'
    if (data.CountInStock < quantity) {
      window.alert("sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    // Its comming in usenavigate hooks in react routerdom
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {error} </MessageBox>
  ) : (
    <div>
      <Row>
        {/* // For  products images */}
        <Col md={6}>
          <img
            className="img-large"
            src={product.Image}
            alt={product.Name}
          ></img>
        </Col>
        {/*// For products*/}
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                {/*pour afficher le nom du produit sur le haut du site et hemelt est une pakage pour permetre le nom du produit de s'afficher dans le site meme*/}
                <title> {product.Name} </title>
              </Helmet>
              <h1> {product.Name} </h1>
              {/*pour afficher le nom du produit*/}
            </ListGroup.Item>
            <ListGroup.Item>
              {/*pour afficher le rating du produit*/}
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
              {/*pour afficher le prix du produit*/}
              <ListGroup.Item>Prix: {product.prix} FCFA</ListGroup.Item>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p> {product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/*// For products informations*/}
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col> {product.prix}FCFA</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
