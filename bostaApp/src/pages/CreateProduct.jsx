import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image:null
  });
  
  const [errors, setErrors] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const navigate = useNavigate(); 
  const validate = () => {
    let tempErrors = {};

    
    if (!formData.title.trim()) tempErrors.title = "Title is required.";
    if (!formData.description.trim()) tempErrors.description = "Description is required.";
    if (!formData.category.trim()) tempErrors.category = "Category is required.";
    if (!formData.price) {
      tempErrors.price = "Price is required.";
    } else if (parseFloat(formData.price) <= 0) {
      tempErrors.price = "Price must be a positive number.";
    }

    setErrors(tempErrors);
 
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form is valid! Submitting data:", formData);
    } else {
      console.log("Form has errors.");
    }

    if (validate()) {
      setSubmitBtnDisabled(true);
    axios
      .post("https://fakestoreapi.com/products", formData)
      .then((res) => {
        console.log("Product is Added successfully:", res.data);
        setIsAdded(true);
        setFormData({ title: "", price: "", description: "", category: "", image: "" });
        setTimeout(() => {
          setIsAdded(false); 
        }, 3000);
        setSubmitBtnDisabled(false);
      })
      .catch((err) => {
        console.error("Product is not added:", err);
      });
  }
  };

 

 return (
  <div className="container mt-5">

    <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        Back to Products
      </button>
    {isAdded && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            Product created successfully.
          <button type="button" className="btn-close" onClick={() => setIsAdded(false)}></button>
        </div>
      )}

    <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Add New Product</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Product Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Enter product title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Price ($)</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Category</label>
            <input
              type="text"
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              placeholder="Electronics, etc."
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>
        </div>

       
        <div className="mb-4">
          <label className="form-label fw-bold">Image URL</label>
          <input
            type="url"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg" disabled={submitBtnDisabled}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default CreateProduct;