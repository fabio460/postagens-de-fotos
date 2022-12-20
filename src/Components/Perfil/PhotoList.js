import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PhotoList({User}) {

    const itemData = [];

      const ramdomCols = (c,n)=>{
        return Math.ceil(Math.random(c)*n)
      }
      
  
      User.Postagems.map((elem,key)=>{
        itemData.push({
            img:elem.imagem,
            title: elem.titulo,
            rows: 2,
            cols: 2,
        })
      })
    const ImageListStyle = {
       width: 500, height: 400,
       "@media (max-width:500px)":{
        width:"100%",
        
       } 
    }
  return (
    <ImageList
      sx={ImageListStyle}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}



