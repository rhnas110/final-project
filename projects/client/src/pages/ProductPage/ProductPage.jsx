import React, { useState } from "react";
import {
  Box,
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { Product } from "../../components/Product/Product";
import { NavbarComp } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useSearchParams } from "react-router-dom";

export const ProductPage = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [pmax, setPmax] = useState("");
  const [pmin, setPmin] = useState("");
  const [valueMax, setValueMax] = useState("");
  const [valueMin, setValueMin] = useState("");
  const [page, setPage] = useState(1);
  const [click, setClick] = useState(0);

  function setPrice() {
    setPmax(valueMax);
    setPmin(valueMin);
  }
  return (
    <>
      <NavbarComp
        searchquery={searchparams.get("search_query")}
        setSearchParams={setSearchParams}
        setSearch={setSearch}
        setPage={setPage}
      />
      <Container
        maxW="full"
        color={"white"}
        pt={"5"}
        pb={"5"}
        display={"flex"}
        flexDirection={"row"}
        mb={"20"}
      >
        <Box w={"20%"} pt={"2.5"}>
          <Box mb={"6px"}>
            <Text fontWeight={"bold"}>Filter</Text>
          </Box>
          <Box
            borderColor="rgb(213, 75, 121)"
            borderRadius=".4em"
            borderWidth="2px"
            p={2}
            mb={"6px"}
          >
            <Box display={"flex"} flexDirection={"column"} gap={"4"}>
              <Text>Harga</Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="Rp"
                />
                <Input
                  placeholder="Minimum Price"
                  onChange={(e) => setValueMin(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="Rp"
                />
                <Input
                  placeholder="Maximum Price"
                  onChange={(e) => setValueMax(e.target.value)}
                />
              </InputGroup>
            </Box>
          </Box>
          <Box hidden={valueMin || valueMax ? false : true} textAlign={"right"}>
            <Button
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={() => {
                setPrice();
                setClick(click + 1);
              }}
              disabled={click === 2 ? true : false}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Product
          search={searchparams.get("search_query")}
          page={page}
          setPage={setPage}
          pmax={pmax}
          pmin={pmin}
        />
      </Container>
      <Footer />
    </>
  );
};
