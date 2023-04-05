
import React, { useState } from 'react'
import Axios from 'axios';


function SingleComment(props:any) {
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e:any) => {
        setCommentValue(e.currentTarget.value)
    }


    const onSubmit = (e:any) => {
        e.preventDefault();

        const variables = {
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }
    return (
        <div>

              <p>{props.comment}</p>

        </div>
    )
}

export default SingleComment