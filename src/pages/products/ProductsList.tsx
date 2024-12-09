import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchProducts,
  getProductsData,
} from "../../store/slices/productSlice";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import styles from "./ProductsList.module.css";
import Pagination from "../../components/pagination/Pagination";
import CustomButton from "../../components/button/CustomButton";
import { useNavigate } from "react-router-dom";
import ProductData from "../../components/ProductData";

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, productsLoading, productsError, total } =
    useAppSelector(getProductsData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    dispatch(fetchProducts({ skip, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onItemsPerPageChange = (page: number) => {
    setItemsPerPage(page);
  };

  if (productsLoading) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    return (
      <p className={styles.error}>
        {productsError || "Failed to get products"}
      </p>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.productGrid}>
        {products.length === 0 && <p>No Data Available</p>}
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.thumbnail}
              />
              <h2 className={styles.productTitle}>{product.title}</h2>
              <ProductData title="Category" value={product.category || "--"} />
              <ProductData title="Brand" value={product.brand || "--"} />
              <ProductData title="Rating" value={product.rating || "--"} />
              <ProductData title="Price" value={product.price || "--"} />
              <ProductData
                title="Discount"
                value={product.discountPercentage || "--"}
              />
              <CustomButton
                title="View Details"
                type="button"
                className={styles.productBtn}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={total}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </section>
  );
};

export default ProductsList;
