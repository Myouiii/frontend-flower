import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../Responsive"
import { useDispatch } from "react-redux";
import { logOut } from '../redux/apiRequest';
import { createAxios } from "../../src/createInstance";
import { logoutSuccess } from '../redux/authSlice';
import { useSelector } from "react-redux";

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex:1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "19px" })}
`;

const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const LoginName = styled.span`
    color: coral;
    font-size: 16px;
`;

const Navbar = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = user?.accessToken;
    const id = user?._id;
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, id, accessToken, axiosJWT);
    }

    const quantity = useSelector(state => state.cart.quantity)
    console.log(quantity)



    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <SearchIcon style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to={"/"} style={{ textDecorationLine: "none" }}>
                        <Logo>Smart 4.0</Logo>
                    </Link>
                </Center>
                <Right>


                    {user ? (
                        <>
                            <MenuItem> <LoginName>Hi, {user.username}</LoginName></MenuItem>
                            <MenuItem > <Link onClick={handleLogout}>Đăng xuất</Link></MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem>
                                <Link to={"/register"} style={{ textDecorationLine: "none" }}>
                                    Đăng ký
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={"/login"} style={{ textDecorationLine: "none" }} >
                                    Đăng nhập
                                </Link>
                            </MenuItem>
                        </>
                    )}

                    <Link to={"/cart"} style={{ textDecorationLine: "none" }} >
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar