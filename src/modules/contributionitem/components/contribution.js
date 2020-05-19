import React, { useEffect, useState } from 'react'
import { Typography } from '@rmwc/typography'
import { useDispatch, useSelector } from 'react-redux'
import { contributionDetails, postComment } from '../duckies'
import { useParams } from 'react-router-dom'

export const ContributionForm = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const contributionDetailsUI = useSelector((state) => state.contributionDetails[id])

    useEffect(() => {
        dispatch(contributionDetails(id))
    }, [id])

    const [textComment, setTextComment] = useState('')

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
            {!!contributionDetailsUI &&
            <div>
                <Typography use="headline6" tag='h1'>ID: {contributionDetailsUI.id}</Typography>
                <Typography use="headline6">{contributionDetailsUI.content}</Typography>
                {[...contributionDetailsUI.comments].map((item) =>
                    <Typography use="body2" tag='h6'>{item.content}</Typography>
                )}
            </div>
            }
        </>
    )
}

/*{Object.entries(contributionDetailsUI.comments).map(item =>
    <Typography use="headline1">{item.content}</Typography>
)}*/

