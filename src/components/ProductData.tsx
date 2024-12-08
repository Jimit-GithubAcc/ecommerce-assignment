import React from "react";
import styles from "../pages/products/ProductsList.module.css";

interface ProductDataProps {
  title: string;
  value: string | number;
}

const ProductData: React.FC<ProductDataProps> = ({ title, value }) => {
  return (
    <div className={styles.productData}>
      <p className={styles.productText}>{title}</p>
      <p style={{ flex: 0.2 }}>:</p>
      <p className={styles.productVal}>{value}</p>
    </div>
  );
};

export default ProductData;
