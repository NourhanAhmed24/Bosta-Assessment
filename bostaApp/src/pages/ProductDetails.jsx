import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
  <div className="container" style={{ marginTop: "100px" }}>
    <div className="card mx-auto shadow-sm text-center" style={{ width: "50%", padding: "40px" }}>
      <div className="card-body">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="card-text fw-bold">Loading products Detials</p>
      </div>
    </div>
  </div>
);
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: "40px", margin: "0 auto" }}>
     
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        Back to Products
      </button>
      <div style={{ display: "flex", justifyContent: "center",marginTop:"20px"   }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "center" , width:"800px", justifyContent:"center"}}>
        <img src={product.image} alt={product.title} style={{ width: "300px" }} />
        
        <div>
          <h1>{product.title}</h1>
          <p style={{ background: "#eee", padding: "5px 10px", display: "inline-block" }}>
            {product.category}
          </p>
          <h2 style={{ color: "green" }}>${product.price}</h2>
          <p style={{ lineHeight: "1.6" }}>{product.description}</p>
          
          <button className="btn btn-outline-primary mt-2 w-100" >
            Add to Cart
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;