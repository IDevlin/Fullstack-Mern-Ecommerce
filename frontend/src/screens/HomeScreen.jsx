//import React, { useState } from 'react';
import {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
const ProductScreenLazy = lazy(() => import("./ProductScreen"));

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [modal, setModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([5, 100]);
  const [resultsFound, setResultsFound] = useState(true);

  const [categories, setCategories] = useState([
    { id: 1, checked: false, label: 'Shoes' },
    { id: 2, checked: false, label: 'Clothes' },
    { id: 3, checked: false, label: 'Accessories' },
  ]);

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  const [list, setList] = useState(products);

  useEffect(() => {
    document.querySelector("html").style.overflow = "auto"; //active overflow in this view
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const modalHandler = useCallback(
    (product) => {
      const productItem = products.find((item) => item.slug === product.slug);
      setSlug(productItem.slug);
      setModal(!modal);
    },
    [modal, products]
  );

  const productElements = useMemo(
    () =>
      products.map((product) => (
        <Product
          key={product.slug}
          product={product}
          slug={slug}
          setSlug={setSlug}
          modalHandler={modalHandler}
        ></Product>
      )),
    [products, slug, setSlug, modalHandler]
  );

  const handleSelectBrand = (e, value) => !value ? null : setSelectedBrands(value);

  const handleChangePrice = (e, value) => setSelectedPrice(value);

  const handleCategoryChecked = (id) => {
    const categoryStateList = categories;
    const changeCheckedCategories = categoryStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCategories(changeCheckedCategories);
  };

  const applyFirters = () => {
    let updatedList = products;

    // Breand Filter
    if (selectedBrands) {
      updatedList = updatedList.filter((item) => item.brand === selectedBrands);
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }
     // Categories Filter
     const categoriesChecked = categories
     .filter((item) => item.checked)
     .map((item) => item.label.toLowerCase());

   if (categoriesChecked.length) {
     updatedList = updatedList.filter((item) =>
       categoriesChecked.includes(item.category)
     );
   }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFirters();
  }, [selectedBrands, searchInput, selectedPrice, categories]);

  console.log(searchInput);
  return (
    <div className="home_container">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <section className="hero-section">
        <FilterPanel
          handleBrands={handleSelectBrand}
          selectedPrice={selectedPrice}
          handlePrice={handleChangePrice}
          categories={categories}
          handleChecked={handleCategoryChecked}
          selectedBrands={selectedBrands}
        />
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            productElements
          )}
        </div>
      </section>
      {modal && (
        <Suspense fallback={<LoadingBox />}>
          <ProductScreenLazy slug={slug} />
        </Suspense>
      )}
    </div>
  );
};

export default HomeScreen;
