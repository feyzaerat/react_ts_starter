import React, { useEffect, useState } from "react";
import { Header, ProductCard } from "../../../components";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { GetAllProductsModel } from "../../../models/responses/GetAllProducts";

import "../../../pages/products.css";
import { ProductModel } from "../../../models/responses/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../toolkitStore/slices/productSlice";
import { AppDispatch } from "../../../toolkitStore/store";

type Props = {};

const Products = (props: Props) => {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  /*const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [deletedIds]);

  const fetchProducts = () => {
    let service: ProductService = new ProductService();
    service.getAll().then((response) => {
      setProducts(response.data);
      console.log("data",response.data);
    });
  };*/
  const productsState = useSelector((state: any) => state.product);
	const dispatch = useDispatch <AppDispatch>();
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);


  const [deletedProductIds, setDeletedProductIds] = useState<number[]>([]);

  const handleDelete = (productId: number) => {
    // insert to deleted List
    setDeletedIds((prevIds) => [...prevIds, productId]);
    console.log("Deleted Product:", productId);
    alert("Deleted Product.. ID:" + productId);
  };

  return (
    <>
      <Header />
      <div className="productContainer">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end mb-5">
              <Link to={"/addProduct"} className="btn btn-secondary">
                Add New Product
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {productsState.products.map((product:any) => (
            <div
              key={product.id}
              className="col-xl-3 col-l-4 col-md-6 col-sm-12"
            >
              <ProductCard product={product} onDelete={handleDelete} />{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
