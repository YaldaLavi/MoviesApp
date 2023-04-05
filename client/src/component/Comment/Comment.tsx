
import React, { useState, useEffect } from 'react'
import { Button ,Input } from '@mui/material' ;
import axios from 'axios';
import SingleComment from '../SingleComment';
import { MovieDetail } from "../../types/movie";
import './Comment.css'

interface CommentContentType {
    id: string | number;
}

function Comments(props:CommentContentType) {
    const [Comment, setComment] = useState("")
    const [movieDetail, setMovieDetail] = useState({} as MovieDetail);
    const fetchMovieDetail = async () => {
        const { data } = await axios.get(
          `http://localhost:3001/api/movie/${props.id}`
        );
        
        setMovieDetail(data);
        console.log(movieDetail.comments)
    };

    const handleChange = (e:any) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e:any) => {
        e.preventDefault();

        const variables = {
            comment: Comment,
            id: props.id
        }
        
        axios.post('http://localhost:3001/api/movie/comment', variables)
            .then(response => {
                setComment("")
                fetchMovieDetail();
            }).catch(err => {
                alert('Failed to save Comment');
            })
    }

    useEffect(() => {
        fetchMovieDetail();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='comment'>
            <br />
            <p>Comments:</p>
            <hr />

            {movieDetail.comments && movieDetail.comments.map((comment:string, index:number) => (
                    <React.Fragment>
                        <SingleComment comment={comment} postId={index} refreshFunction={null} />
                    </React.Fragment>
            ))}



            {/* Root Comment Form */}
            <form style={{ display: 'flex', paddingBottom:'50px' ,padding:'15px' }} onSubmit={onSubmit}>
                <Input
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments