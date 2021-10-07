import React from "react";
import skyview from '../img/Football/카카오스카이뷰.jpg'
import imgUrl1 from '../img/Football/Football1.jpg'
import Carousel from 'react-material-ui-carousel';
import { Card } from '@material-ui/core';
import styled from 'styled-components';

const FootBallPage = () => {

  const items = [
    {
      img: imgUrl1,
    },
    {
      img: ''
    },
    {
      img: ''
    },
  ];

  const IMG = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 5%;     
    width: 100%;
    height: 50;
    `;


  const Item = ({ img }) => {
    return (
      <Card style={{overflow: "hidden", display: "flex", borderRadius: "5%"}}>
        <IMG
          src={img}
        />
      </Card>
    );
  };
  return (
    <>
      <h2 style={{marginTop: '40px'}}>시설 안내</h2>
      <div>
        <img src={skyview} width='600' height='400'>
        </img>
      </div>

      <div style={{ textAlign: "center" }}>
      <h3 style={{marginTop: '60px'}}>시설 이미지</h3>
        <Carousel>
          {items.map((item, i) => (
            <Item key={i} {...item} />
          ))}
        </Carousel>
      </div>
    </>
  );
}
export default FootBallPage;