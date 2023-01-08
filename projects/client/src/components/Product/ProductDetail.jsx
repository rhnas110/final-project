import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const baseApi = process.env.REACT_APP_API_BASE_URL;

export const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
  const url_detail = `${baseApi}/product/detail/${name}`;

  const getProduct = async () => {
    const response = await (await axios.get(url_detail)).data;
    setProduct(response);
  };

  console.log(product);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      ProductDetail
      <Box color={"white"}>{product?.name}</Box>
    </div>
  );
};
