import React from "react";
import skyview from '../img/Football/map.png'
import imgUrl1 from '../img/Football/Football.png'
import imgUrl2 from '../img/Football/Basketball.png'
import imgUrl3 from '../img/Football/Pingpong.png'
import Carousel from 'react-material-ui-carousel';
import { Card, Paper } from '@material-ui/core';
import styled from 'styled-components';

const FootBallPage = () => {

  const items = [
    {
      img: imgUrl1
    },
    {
      img: imgUrl2
    },
    {
      img: imgUrl3
    },
  ];

  const IMG1 = styled.img`
    width: 600px;
    height: 400px;
    width: 100%;
    height: 100%;
    `;

  const IMG2 = styled.img`
    width: 300px;
    height: 300px;
    width: 100%;   
    height: 100%;
    `;


  const Item = ({ img }) => {
    return (
      <Paper style={{display: "flex", width: '600px', height: '300px'}}>
        <IMG2
          src={img}
        />
      </Paper>
    );
  };

  return (
    <>
      <h2 style={{marginTop: '40px', textAlign: "center", fontFamily:"NanumSquare", color: 'green', fontWeight: 700}}>시설 안내</h2>
      <div>
        <IMG1 src={skyview}/>
      </div>

      <div>
      <h2 style={{marginTop: '60px', textAlign: "center", fontFamily:"NanumSquare", color: 'green',fontWeight: 700}}>시설 이미지</h2>
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