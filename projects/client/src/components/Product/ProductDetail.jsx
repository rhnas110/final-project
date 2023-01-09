import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperStyle.css";

const baseApi = process.env.REACT_APP_API_BASE_URL;
const baseServer = process.env.REACT_APP_SERVER;

export const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
  const [imageProduct, setImageProduct] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const url_detail = `${baseApi}/product/detail/${name}`;

  const getProduct = async () => {
    const response = await (await axios.get(url_detail)).data;
    setProduct(response);
    setImageProduct(response.Product_Images);
    const stock = response.Details.map((item) => item.stocks).reduce(
      (a, b) => a + b,
      0
    );
    if (response.weight >= 1000) {
      const weight = response.weight / 1000;
      setWeight(weight);
    }
    setTotalStock(stock);
    setSubtotal(response.price);
    console.log(response);
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Container maxW={"inherit"} h={"90vh"} color={"white"} px={"32"}>
      <Box textAlign={"right"} mb={"2"}>
        <Button
          size={"sm"}
          borderColor="rgb(213, 75, 121)"
          borderRadius=".6em"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "rgb(213, 75, 121)" }}
          _active={{ bg: "none" }}
          onClick={() => window.history.back()}
        >
          <Icon as={CloseIcon} />
        </Button>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        <GridItem px={6} pt={2}>
          <Box
            w="369px"
            borderRadius="md"
            // overflow="hidden"
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {imageProduct?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      src={`${baseServer}${item.image}`}
                      alt={item?.name}
                      borderRadius={"xl"}
                      width="100%"
                      height="100%"
                      objectFit={"cover"}
                      bgGradient={
                        (index + 1) % 2 === 0
                          ? "linear(to-r, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                          : "linear(to-l, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                      }
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </GridItem>
        <GridItem p={2}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"extrabold"}>
              {product?.name}
            </Text>
            <Text
              fontWeight="bold"
              fontSize={"2xl"}
              _hover={{ fontStyle: "italic" }}
              color={"rgb(213, 75, 121)"}
            >
              {`Rp${product.price?.toLocaleString()}`}
            </Text>
          </Box>
          <Divider my={"3"} />
          <Box mb={"3"} color={"gray"}>
            <Text>Condition: New</Text>
            <Text>Status: {totalStock ? "Ready" : "Out of Stock"}</Text>
            <Text>
              Unit Weight: {weight ? weight : product?.weight}{" "}
              {product?.weight < 1000 ? "g" : "kg"}
            </Text>
            <Text>
              Category:{" "}
              <Text
                as={Link}
                to={`/product?search_query=${product?.category}`}
                color={"rgb(213, 75, 121)"}
                textTransform={"capitalize"}
                fontWeight={"semibold"}
              >
                {product?.category}
              </Text>
            </Text>
          </Box>
          <Box h={"292px"} overflow={"auto"}>
            <Text>{product?.desc}</Text>
          </Box>
        </GridItem>
        <GridItem px={"16"} pt={4}>
          <Box
            borderColor="rgb(213, 75, 121)"
            borderRadius="md"
            borderWidth="3px"
            p={3}
          >
            <Text>Set the quantity</Text>
            <Divider my={"3"} />
            <Box display={"flex"} gap={2} alignItems={"center"} mb={"5"}>
              <Box width={"45%"}>
                <NumberInput
                  size={"md"}
                  defaultValue={quantity}
                  min={1}
                  max={totalStock}
                  borderColor={"gray"}
                >
                  <NumberInputField
                    accept="num"
                    onChange={(e) => {
                      setQuantity(+e.target.value);
                      if (e.target.value === "") {
                        setQuantity(0);
                        return 0;
                      }
                      if (e.target.value < 1) {
                        return setQuantity(1);
                      }
                      if (e.target.value > totalStock) {
                        return setQuantity(totalStock);
                      }
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      bg="rgb(213, 75, 121)"
                      children="+"
                      onClick={() => {
                        if (quantity !== totalStock) setQuantity(quantity + 1);
                      }}
                    />
                    <NumberDecrementStepper
                      bg="rgb(213, 75, 121)"
                      children="-"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Text>
                Stock:{" "}
                <Text as={"span"} fontWeight="bold" color={"rgb(213, 75, 121)"}>
                  {totalStock}
                </Text>
              </Text>
            </Box>
            {/* <Box>
              <Text>
                Max purchase of this item is {totalStock} items, reduce your
                purchase!
              </Text>
            </Box> */}
            <Box display={"flex"} justifyContent={"space-between"} mb={"4"}>
              <Text color={"gray"}>Subtotal</Text>
              <Text fontWeight="bold" color={"rgb(213, 75, 121)"}>
                {`Rp${(subtotal * quantity).toLocaleString()}`}
              </Text>
            </Box>
            <Box>
              <Button
                w={"100%"}
                colorScheme={"pink"}
                onClick={() => alert("login first")}
              >
                + Keranjang
              </Button>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
