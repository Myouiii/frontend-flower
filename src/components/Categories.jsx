import styled from "styled-components"
import { useState, useEffect } from 'react';
import CategoryItem from "./CategoryItem";
import { mobile } from "../Responsive";
import axios from 'axios';
import { publicRequest } from "../requestMethod";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between; 
    ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = ({ filters }) => {

    const [cate, setCate] = useState([]);
    // useEffect(() => {
    //     async function fetchList() {
    //         const requesUrl = 'https://635a2361ff3d7bddb9aff1b9.mockapi.io/categories';
    //         const response = await fetch(requesUrl);
    //         const responseJSON = await response.json();
    //         //console.log({responseJSON});
    //         // setSlideIndex(responseJSON);
    //         setData(responseJSON);

    //     }
    //     fetchList();
    // }, []);


    useEffect(() => {
        const getCate = async () => {
            try {
                const res = await publicRequest.get("/cate"
                );
                setCate(res.data);
                console.log(res);
            } catch (err) {

            }
        };
        getCate()
    }, [])


    return (
        <Container>
            {
                cate.map((item) => {
                    return (
                        <CategoryItem item={item} key={item.id} />
                    )
                })
            }

        </Container>
    )
}

export default Categories