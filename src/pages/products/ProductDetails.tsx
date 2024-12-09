import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchProductDetails,
  getProductsData,
} from "../../store/slices/productSlice";
import styles from "./ProductDetails.module.css";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, singleProductLoading, singleProductError } =
    useAppSelector(getProductsData);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(Number(id)));
    }
  }, [id, dispatch]);

  if (singleProductLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (singleProductError) {
    return <div className={styles.error}>{singleProductError}</div>;
  }

  if (!product) {
    return <div className={styles.error}>No product found.</div>;
  }

  return (
    <section className={styles.productContainer}>
      <FaArrowLeft onClick={() => navigate("/")} className={styles.backIcon} />
      <section className={styles.productDetails}>
        <div className={styles.imageContainer}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className={styles.details}>
          <h1>{product.title}</h1>
          <p>{product.description || "--"}</p>
          <p>
            <strong>Price:</strong> ${product.price || "--"}
          </p>
          <p>
            <strong>Discount:</strong> {product.discountPercentage || "--"}%
          </p>
          <p>
            <strong>Rating:</strong> {product.rating} / 5
          </p>
          <p>
            <strong>Stock:</strong> {product.stock || "--"}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand || "--"}
          </p>
          <p>
            <strong>Category:</strong> {product.category || "--"}
          </p>
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;
