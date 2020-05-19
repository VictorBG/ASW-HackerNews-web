import React, {useEffect, useState} from 'react'
import {Typography} from '@rmwc/typography'
import {useDispatch, useSelector} from 'react-redux'
import {contributionDetails, postComment} from "../duckies";
import {useParams} from 'react-router-dom'

export const ContributionForm = () => {
    const dispatch = useDispatch()
    const contributionDetailsUI = useSelector((state) => state.contributionDetails)

    const {id} = useParams()

    useEffect(() => {
        dispatch(contributionDetails(id))
    }, [id])

    console.log(contributionDetailsUI.comments)

    const [textComment, setTextComment] = useState('');

    const createComment = () => dispatch(postComment({
        payload: {
            parentId: id,
            text: textComment
        }
    }))

    const onCommentClick = () => {
        createComment()
    }

    return (
        <>
            <Typography use="headline1">ID: {contributionDetailsUI.id}</Typography>
            <Typography use="headline1">{contributionDetailsUI.content}</Typography>

        </>
    )
}

/*{Object.entries(contributionDetailsUI.comments).map(item =>
    <Typography use="headline1">{item.content}</Typography>
)}*/

