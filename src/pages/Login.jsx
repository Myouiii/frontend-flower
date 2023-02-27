import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/apiRequest';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?cs=srgb&dl=pexels-pixabay-68507.jpg&fm=jpg&_gl=1*itdw7h*_ga*ODE1MTMxODY5LjE2NjcxNDc3NDk.*_ga_8JE65Q40S6*MTY2NzE0Nzc0OS4xLjEuMTY2NzE0Nzc1Ni4wLjAuMA..") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    //${mobile({ height: "75%", })}
    
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;   
    ${mobile({ width: "75%", marginTop: "10vw" })}
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color:green;
        cursor: not-allowed;
    }
`;

const Links = styled.a`
    margin: 10px 0px;
    font-size: 14px;
    //text-decoration: underline;
    cursor: pointer;
    
`;
const Error = styled.span`
    color:red;
`;

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, error } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        };
        loginUser(newUser, dispatch, navigate);
    }
    return (
        <Container>
            <Wrapper>
                <Title>Đăng nhập</Title>
                <Form onSubmit={handleLogin} disabled={isFetching}>
                    <Input placeholder="Tài khoản" onChange={(e) => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                    <Button >Đăng nhập</Button>
                    {error && <Error>Sai tài khoản hoặc mật khẩu</Error>}
                    <Link style={{ textDecorationLine: "none", color: "black" }}>
                        <Links>
                            Quên mật khẩu?
                        </Links>
                    </Link>
                    <Link to={"/register"} style={{ textDecorationLine: "none", color: "black" }}>
                        <Links>
                            Đăng ký tài khoản mới?
                        </Links>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login