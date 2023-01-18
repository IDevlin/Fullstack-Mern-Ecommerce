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
import { categoriesList } from "../data/list";
import Footer from "./dashboard/Footer/Footer";
import afterColor from "/images/slider/aftercolor-paint.png";
import SliderCards from "./SliderCards";
import Features from "./Features";
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
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [resultsFound, setResultsFound] = useState(true);
  const [categories, setCategories] = useState(categoriesList);

  const handleClose = () => setShowModal(false);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  const [listProducts, setListProducts] = useState(products);

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
    applyFilters();
  }, [ searchInput, categories]);

  const modalHandler = useCallback(
    (product) => {
      const productItem = products.find((item) => item.slug === product.slug);
      setSlug(productItem.slug);
      setShowModal(!showModal);
    },
    [showModal, products]
  );

  const handleCategoryChecked = (id) => {
    const categoryStateList = categories;
    const changeCheckedCategories = categoryStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCategories(changeCheckedCategories);
  };

  const applyFilters = () => {
    let updatedList = products;

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
      .map((item) => item.label);

    if (categoriesChecked.length) {
      updatedList = updatedList.filter((item) =>
        categoriesChecked.includes(item.category)
      );
    }
    setListProducts(updatedList);

    updatedList.length ? setResultsFound(true) : setResultsFound(false);
  };

  window.addEventListener('scroll', () => {
    const search = document.querySelector('.searchBar-wrap')
    search.classList.toggle('active-search', window.scrollY > 100)
})

  const productElements = useMemo(
    () =>
      !resultsFound
        ? products.map((product) => (
            <Product
              key={product.slug}
              product={product}
              slug={slug}
              setSlug={setSlug}
              modalHandler={modalHandler}
              handleClose={handleClose}
            ></Product>
          ))
        : listProducts.map((product) => (
            <Product
              key={product.slug}
              product={product}
              slug={slug}
              setSlug={setSlug}
              modalHandler={modalHandler}
              handleClose={handleClose}
            ></Product>
          )),
    [products, slug, setSlug, modalHandler]
  );

  return (
    <div className="home_container">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className="heading-section">
        <div className="title-heading">
          <div className="title">
          <h1>Our Best</h1>
          <h1>Colections</h1>
          <h1> For you</h1>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
            assumenda, cupiditate delectus nemo labore qui debitis ullam sunt
            sed perspiciatis impedit, amet laudantium fuga dignissimos
          </p>
          <a href="#shop-area"><button  >Visit Colletion</button></a>
        </div>
        <img className="aftercolor" src={afterColor} alt="" />
        <div className="sliderWidth">
          <SliderCards />
        </div>
      </div>
      <Features/>
      <section className="hero-section" id="shop-area">
      <FilterPanel
            categories={categories}
            handleChecked={handleCategoryChecked}
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
        <Footer />
      </section>
      {showModal && (
        <Suspense fallback={<LoadingBox />}>
          <ProductScreenLazy slug={slug} modalHandler={modalHandler} show={showModal} handleClose={handleClose} />
        </Suspense>
      )}
    </div>
  );
};

export default HomeScreen;

/* const HomeScreen = () => {
  // Declara variables para controlar la paginación
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Calcula el rango de productos a mostrar en la página actual
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  // Renderiza los productos de la página actual
  const productElements = currentProducts.map((product) => (
    <Product
      key={product.slug}
      product={product}
      slug={slug}
      setSlug={setSlug}
      modalHandler={modalHandler}
    ></Product>
  ));

  // Calcula el número total de páginas
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="home_container">
      // Muestra los productos 
      <div className="products">{productElements}</div>
      // Muestra la barra de paginación //
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};  


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
     //* Botón "Anterior" //
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>
          Anterior
        </button>
      )}
     // Número de página actual //
      <span>Página {currentPage} de {totalPages}</span>
     // Botón "Siguiente" //
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>
          Siguiente
        </button>
      )}
    </div>
  );
};


Para manejar el renderizado condicional de la variable productElements dentro de la paginación, puedes usar la función useMemo de la siguiente manera:

Copy code
const HomeScreen = () => {
  // Declara variables para controlar la paginación
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Calcula el rango de productos a mostrar en la página actual
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  // Renderiza los productos de la página actual usando useMemo
  const productElements = useMemo(() => {
    return !resultsFound
      ? currentProducts.map((product) => (
          <Product
            key={product.slug}
            product={product}
            slug={slug}
            setSlug={setSlug}
            modalHandler={modalHandler}
          ></Product>
        ))
      : listProducts.map((product) => (
          <Product
            key={product.slug}
            product={product}
            slug={slug}
            setSlug={setSlug}
            modalHandler={modalHandler}
          ></Product>
        ));
  }, [currentProducts, resultsFound, listProducts, slug, setSlug, modalHandler]);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="home_container">
     // Muestra los productos //
      <div className="products">{productElements}</div>
     // Muestra la barra de paginación //
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

*/
