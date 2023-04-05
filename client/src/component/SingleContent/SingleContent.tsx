import * as React from 'react';
import { Badge } from '@mui/material';
import { img_300, unavailable } from "../../config";
import { MovieDetail } from "../../types/movie";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SingleContent.css";
import SpringModal from "../Model/Modal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export interface SingleContentType {
    key:string |number
    id: string | number;
    poster: string | number;
    title: string;
    date: string;  
  }

const SingleContent = (props:SingleContentType) => {
  const [movieDetail, setMovieDetail] = useState({} as MovieDetail);
  const[show,setShow]=useState(false)
  const [open, setOpen] = React.useState(false);

  const fetchMovieDetail = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/movie/${props.id}`
    );
    
    setMovieDetail(data);
  };

  useEffect(() => {
    fetchMovieDetail();
    // eslint-disable-next-line
  }, []);
 

  return (
    <>
      <Badge badgeContent={movieDetail.rate} color="primary">
       <Card sx={{ minWidth: 320 ,maxWidth:320,boxShadow: 3}}>
      <CardActionArea className='card'>
      <CardMedia
        color={movieDetail.rate > 6 ? "primary" : "secondary"}
          component="img"
          height="350"
          image={props.poster ? `${img_300}${props.poster}` : unavailable}
          alt={props.title}
          onClick={() => setOpen(true)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <SpringModal  id={movieDetail.id} name={props.title} onClose={() => setOpen(false)} show={show} handelOpen={() => setOpen(true)} open={open} />
          {props.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </Badge>
   
    </>
  );
};
export default SingleContent;

