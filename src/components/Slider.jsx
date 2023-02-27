import styled from "styled-components"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mobile } from '../Responsive'

const Container = styled.div`
    width: 100%;
    height: 25vw;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    //align-items: center;
    background-color: #${props => props.bg};
`;

const ImgContainer = styled.div`
    height: 85%;
    flex: 1;
`;

const Image = styled.img`
    height: 70%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1.5px;
`;

const Button = styled.button`
    margin-top: 20vh;
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchList() {
            const requesUrl = 'https://635a2361ff3d7bddb9aff1b9.mockapi.io/item';
            const response = await fetch(requesUrl);
            const responseJSON = await response.json();
            //console.log({responseJSON});
            // setSlideIndex(responseJSON);
            setData(responseJSON);

        }

        fetchList();

    }, []);

    console.log(data);
    const handleClick = (direction) => {

        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };


    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {
                    data.map((item) => {
                        return (
                            <Slide bg={item.bg} key={item.slideIndex}>
                                <ImgContainer>
                                    <Image src={item.img} />
                                </ImgContainer>
                                <InfoContainer>
                                    <Title>{item.title}</Title>
                                    <Desc>{item.desc}</Desc>
                                    <Button>
                                        <Link to={"/products"} style={{ textDecorationLine: "none" }}>
                                            XEM NGAY
                                        </Link>
                                    </Button>
                                </InfoContainer>
                            </Slide>
                        )
                    })
                }


            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )


}

export default Slider