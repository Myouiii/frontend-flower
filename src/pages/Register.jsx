import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { mobile } from "../Responsive";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { registerUser } from "../redux/apiRequest";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Bkd2lsbGlhbW1vcnJpcy0xMDYtbmFwLmpwZw.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
`;

const Wrapper = styled.div`
    width: 20%;
    padding: 25px;
    background-color: white;
    ${mobile({ width: "75%", marginTop: "-10vh" })}
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Title = styled.h1`
font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    margin: 10px;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
  
`;

const Register = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
            email: email
        };
        registerUser(newUser, dispatch, navigate);
    }
    return (
        <Container>
            <Wrapper>
                <Title>Đăng ký</Title>
                <Form onSubmit={handleRegister}>
                    {/* <Input placeholder="Tên" />
                    <Input placeholder="Họ" /> */}
                    <Input placeholder="Tài khoản" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                    {/* <Input placeholder="Nhập lại mật khẩu" /> */}
                    <Agreement>
                        Tôi đồng ý với mọi <b> CHÍNH SÁCH BẢO MẬT</b>
                    </Agreement>
                    <Button>
                        {/* <Link to={"/Login"} style={{ textDecorationLine: "none", color: "white" }}> */}
                        Đăng ký
                        {/* </Link> */}
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register