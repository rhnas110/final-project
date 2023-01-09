import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Image,
  Text,
  Flex,
  Box,
  Heading,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const baseApi = process.env.REACT_APP_API_BASE_URL;

export const Product = ({ search, page, setPage, pmax, pmin }) => {
  const [product, setProduct] = useState([]);
  const [totalStock, setTotalStock] = useState([]);
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("name");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [totalRows, setTotalRows] = useState(0);

  const urlProduct = `${baseApi}/product?search_query=${
    search ? search : ""
  }&pmax=${pmax}&pmin=${pmin}&page=${
    page - 1
  }&limit=${limit}&order=${order}&by=${order_direction}`;
  const getProduct = async () => {
    try {
      if (!search) {
        return 0;
      }
      const response = await (await axios.get(urlProduct)).data;
      setProduct(response.result);
      setTotalPage(response.totalPage);
      setTotalRows(response.totalRows);
      setOffset(response.offset);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(product);
  const crossTitle = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  useEffect(() => {
    getProduct();
  }, [search, pmax, pmin, page, order, order_direction]);
  return (
    <Container maxW="85%">
      <Container
        maxW="container.lg"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        hidden={product?.length && search ? false : true}
        mb={"6px"}
      >
        <Box>
          <Text>
            Showing {offset ? offset + 1 : "1"} -{" "}
            {page === totalPage ? totalRows : limit * page} items from a total
            of {totalRows ? totalRows : ""} for "{search ? search : ""}"
          </Text>
        </Box>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Text fontWeight={"bold"}>Sort:</Text>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              border={"2px"}
              _hover={{
                borderColor: "rgb(213, 75, 121)",
                bgColor: "transparent",
              }}
              _active={{
                borderColor: "white",
                bgColor: "transparent",
              }}
              bgColor={"transparent"}
            >
              {order === "name" && order_direction === "ASC"
                ? "Best"
                : order === "price" && order_direction === "DESC"
                ? "Highest Price"
                : order === "price" && order_direction === "ASC"
                ? "Lowest Price"
                : order === "product_stocks" && order_direction === "DESC"
                ? "Stock Ready"
                : ""}
            </MenuButton>
            <MenuList minWidth="240px" color={"black"}>
              <MenuItem
                onClick={() => {
                  setOrder("name");
                  setOrder_direction("ASC");
                }}
              >
                Best
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOrder("price");
                  setOrder_direction("DESC");
                }}
              >
                Highest Price
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOrder("price");
                  setOrder_direction("ASC");
                }}
              >
                Lowest Price
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOrder("product_stocks");
                  setOrder_direction("DESC");
                }}
              >
                Stock Ready
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
      <Container
        border={"2px"}
        borderColor={"whiteAlpha.400"}
        borderRadius={"md"}
        maxW="container.lg"
        h={product?.length && search ? "full" : "50vh"}
        color={"inherit"}
      >
        <Box
          textAlign={"center"}
          hidden={product?.length && search ? true : false}
        >
          Product not found
        </Box>
        <Box hidden={product?.length && search ? false : true}>
          <Flex flexWrap={"wrap"} justifyContent={"space-evenly"} pt={"4"}>
            {product?.map((item, index) => {
              return (
                <Box
                  as={Link}
                  to={`${item?.name}`}
                  key={index}
                  w="200px"
                  h="292px"
                  m={"0 8px 18px"}
                  borderRadius={"md"}
                  boxShadow={"0 0 4px 1px rgba(255,255,255,.69)"}
                  position={"relative"}
                  opacity={item.product_stocks === "0" ? ".88" : ""}
                  cursor={
                    item.product_stocks === "0" ? "not-allowed" : "pointer"
                  }
                >
                  {/* <Box
                    bgGradient={
                      (index + 1) % 2 === 0
                        ? "linear(to-r, rgba(74, 10, 74, .88) 16.61%, rgba(38, 8, 68, .88)  92.29%)"
                        : "linear(to-l, rgba(74, 10, 74, .88) 16.61%, rgba(38, 8, 68, .88)  92.29%)"
                    }
                    width={"35%"}
                    borderRadius={"sm"}
                    position={"absolute"}
                    right={"-8"}
                    top={"-2.5"}
                    textAlign={"center"}
                    color={"rgb(213, 75, 121)"}
                    visibility={item.product_stocks === "0" ? "hidden" : ""}
                  >
                    <Text>{item?.product_stocks}</Text>
                  </Box> */}
                  <Box
                    bgColor={"rgba(141,141,141,.69)"}
                    width={"full"}
                    height={"full"}
                    borderRadius={"md"}
                    position={"absolute"}
                    textAlign={"center"}
                    color={"rgb(213, 75, 121)"}
                    visibility={item.product_stocks === "0" ? "" : "hidden"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      border={"4px"}
                      w={"60%"}
                      borderRadius={"sm"}
                      transform={"rotate(-5deg)"}
                      userSelect={"none"}
                    >
                      <Heading>OUT</Heading>
                      <Text fontWeight={"semibold"}>OF STOCK</Text>
                    </Box>
                  </Box>
                  <Box
                    h="165px"
                    w="full"
                    borderTopRadius="md"
                    overflow="hidden"
                  >
                    <Image
                      src={`${process.env.REACT_APP_SERVER}${
                        item?.Product_Images
                          ? item?.Product_Images[0].image
                          : `/public/product/default-product.png`
                      }`}
                      alt={item?.name}
                      width="full"
                      height="full"
                      bgGradient={
                        (index + 1) % 2 === 0
                          ? "linear(to-r, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                          : "linear(to-l, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                      }
                    />
                  </Box>
                  <Box px="4px" h="50%">
                    <Box h="55%" p={2} overflow={"hidden"}>
                      <Text
                        fontWeight={"semibold"}
                        _hover={{ color: "rgb(213, 75, 121)" }}
                        title={item?.name}
                      >
                        {crossTitle(item?.name, 40)}
                      </Text>
                    </Box>
                    <Box p={2}>
                      <Text
                        fontWeight="bold"
                        _hover={{ fontStyle: "italic" }}
                        color={"rgb(213, 75, 121)"}
                      >
                        {`Rp${item?.price.toLocaleString()}`}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Flex>
          <Box p={2} mb={"9px"}>
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              gap={3}
            >
              <Button
                onClick={() => {
                  setPage(page - 1);
                }}
                disabled={page === 1 ? true : false}
                size={{ base: "sm", md: "md" }}
                borderColor="rgb(213, 75, 121)"
                borderRadius=".6em"
                borderWidth="2px"
                bgColor="inherit"
                _hover={{ bg: "rgb(213, 75, 121)" }}
                _active={{ bg: "none" }}
              >
                {"<"}
              </Button>
              <Text alignSelf="center">
                {" "}
                {page} of {totalPage}
              </Text>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPage ? true : false}
                size={{ base: "sm", md: "md" }}
                borderColor="rgb(213, 75, 121)"
                borderRadius=".6em"
                borderWidth="2px"
                bgColor="inherit"
                _hover={{ bg: "rgb(213, 75, 121)" }}
                _active={{ bg: "none" }}
              >
                {">"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
