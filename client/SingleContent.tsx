import React,{useState}from'react';
import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config";
import "./SingleContent.css";
import Modal from "../Modal";
//import ContentModal from "../ContentModal/ContentModal";

interface SingleContentType {
    key:string
    id: string | number;
    poster: string;
    title: string;
    date: string;
    media_type: "movie" | "tv" | any;
    vote_average: number;
  }

const SingleContent = (props:SingleContentType) => {
    const[show,setShow]=useState(false)
  return (
    <>
    <Modal onClose={()=> setShow(false)}show={show}/>
    <div>
      <Badge
        badgeContent={props.vote_average}
        color={props.vote_average > 6 ? "primary" : "secondary"}
      />
    <div className="container" style={{backgroundColor:'#6f86b4'}}>
     
      <img
        onClick={() => setShow(true)}
        className="poster"
        src={props.poster ? `${img_300}${props.poster}` : unavailable}
        alt={props.title}
      />
   
    <div className="gridTitle" style={{backgroundColor:'#6f86b4'}}>
      <b className="title">{props.title}</b>
      <span className="subTitle">
        {props.media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{props.date}</span>
      </span>
      </div>
      </div>
      </div>
       </>
  );
};
export default SingleContent;