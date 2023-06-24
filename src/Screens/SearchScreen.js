import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getError } from "../Utils";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../Components/Rating";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import Button from "react-bootstrap/Button";
import Product from "../Components/Product";
import { LinkContainer } from "react-router-bootstrap";
import axiosInstance from "../config/axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prixs = [
  {
    name: "2500 FCFA to 5000 FCFA",
    value: "2500-5000",
  },
  {
    name: "5001 FCFA to 7500 FCFA",
    value: "5001-7500",
  },
  {
    name: "7501 FCFA to 10000 FCFA",
    value: "7501-10000",
  },
  {
    name: "10001 FCFA to 12500 FCFA",
    value: "10001-12500",
  },
  {
    name: "12501 FCFA to 20000 FCFA",
    value: "12501-20000",
  },
  {
    name: "20001 FCFA to 22500 FCFA",
    value: "20001-22500",
  },
  {
    name: "22501 FCFA to 30000 FCFA",
    value: "22501-30000",
  },
  {
    name: "30001 FCFA to 32500 FCFA",
    value: "30001-32500",
  },
  {
    name: "32501 FCFA to 40000 FCFA",
    value: "32501-40000",
  },
  {
    name: "40001 FCFA to 42500 FCFA",
    value: "40001-42500",
  },
  {
    name: "42501 FCFA to 50000 FCFA",
    value: "42501-50000",
  },
  {
    name: "50001 FCFA to 52500 FCFA",
    value: "50001-52500",
  },
];
console.log("prix du tableau", prixs);

export const ratings = [
  {
    name: "5stars & up",
    value: 5,
  },
  {
    name: "4stars & up",
    value: 4,
  },
  {
    name: "3stars & up",
    value: 3,
  },
  {
    name: "2stars & up",
    value: 2,
  },
  {
    name: "1stars & up",
    value: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const prix = sp.get("prix") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  console.log("voici les produits", products);
  console.log("voici les produitscounts", countProducts);
  console.log("voici les produitspages", pages);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/products/search/?page=${page}&query=${query}&category=${category}&prix=${prix}&rating=${rating}&order=${order}`
        );
        console.log("prix", prix);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data, "données");
      } catch (err) {
        dispatch({
          type: "FETCH-FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, prix, query, rating]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, [dispatch, error]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrix = filter.prix || prix;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&prix=${filterPrix}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3 className="first">Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="seconde">Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === prix ? "text-bold" : ""}
                  to={getFilterUrl({ prix: "all" })}
                >
                  Any
                </Link>
              </li>

              {prixs.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ prix: p.value })}
                    className={p.value === prix ? "text-bold" : ""}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="third">Average Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.value })}
                    className={`${r.rating}` === `${rating}` ? "text-bold" : ""}
                  >
                    <Rating caption={"& up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: "all" ? "text-bold" : "" })}
                  className={rating === "all" ? "text-bold" : ""}
                >
                  <Rating caption={"& up"} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger"> {error} </MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} results
                    {query !== "all" && ":" + query}
                    {category !== "all" && ":" + category}
                    {prix !== "all" && ": Prix" + prix}
                    {rating !== "all" && ": Rating" + rating + "& up"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    prix !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by {""}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Prix: Low to High</option>
                    <option value="highest">Prix: High to Low</option>
                    <option value="toprated">Avg. Customer Review</option>
                  </select>
                </Col>
              </Row>{" "}
              {/*md-3= magin bootom 3 */}
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
