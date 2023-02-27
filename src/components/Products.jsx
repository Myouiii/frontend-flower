import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';
import { publicRequest } from '../requestMethod';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ title, filters, sort }) => {

    //console.log(cat,filters,sort);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    //const [data, setData] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await  publicRequest.get(
                    title
                        ? `product?category=${title}`
                        : "product"
                );
                setProducts(res.data);
                console.log(res);
            } catch (err) {

            }
        };
        getProducts()
    }, [title])

    useEffect(() => {
        title && setFilteredProducts(
            products.filter((item) => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
            ))
        );
    }, [products, title, filters]);

    useEffect(() => {
        if ((sort === "newest")) {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createAt - b.createAt)
            );
        } else if ((sort === "asc")) {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort])



    // useEffect(() => {
    //     async function fetchList() {
    //         const requesUrl = 'https://635a2361ff3d7bddb9aff1b9.mockapi.io/products';
    //         const response = await fetch(requesUrl);
    //         const responseJSON = await response.json();
    //         //console.log({responseJSON});
    //         // setSlideIndex(responseJSON);
    //         setData(responseJSON);

    //     }
    //     fetchList();
    // }, []);
    return (
        <Container>
            {title
                ? filteredProducts.map((item) => (
                    <Product item={item} key={item.id} />
                )) : products
                    .slice(0, 8)
                    .map((item) =>
                        <Product item={item} key={item.id} />
                    )}
        </Container>
    )
}

export default Products