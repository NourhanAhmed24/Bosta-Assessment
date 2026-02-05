import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [sortType, setSortType] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setError(null);
        
      })
      .catch(() => {
        setError("Failed to load products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return (
  <div className="container" style={{ marginTop: "100px" }}>
    <div className="card mx-auto shadow-sm text-center" style={{ width: "50%", padding: "40px" }}>
      <div className="card-body">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="card-text fw-bold">Loading products...</p>
      </div>
    </div>
  </div>
);
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>No products found</p>;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    if (sortType === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
return (
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="display-5">Products</h1>
      <button className="btn btn-primary" onClick={() => navigate(`/CreateProduct`)}>
        + Create Product
      </button>
    </div>


    <div className="row mb-4">
      <div className="col-md-3">
        <select className="form-select" onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="">Sort By...</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>

   
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
      {currentProducts.map((product) => (
        <div key={product.id} className="col">
          <div className="card h-100 shadow-sm">
            <div className="p-3 text-center">
              <img src={product.image} alt={product.title} style={{ height: "150px", objectFit: "contain" }} className="card-img-top" />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-truncate">{product.title}</h5>
              <p className="card-text text-muted small">{product.category}</p>
              <h6 className="fw-bold text-success mt-auto">${product.price}</h6>
              <button 
                className="btn btn-outline-primary mt-2 w-100" 
                onClick={() => navigate(`/productDetails/${product.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

   
    <div className="d-flex justify-content-center gap-2 mt-5 mb-5">
      <button 
        className="btn btn-secondary"
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(prev => prev - 1)}
      >
        Previous
      </button>
      <button className="btn btn-light disabled">Page {currentPage} of {totalPages}</button>
      <button 
        className="btn btn-secondary"
        disabled={currentPage === totalPages} 
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        Next
      </button>
    </div>
  </div>
);
};

export default Products;
