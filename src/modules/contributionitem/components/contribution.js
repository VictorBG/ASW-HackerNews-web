import React, { useEffect, useState } from 'react'
import { Typography } from '@rmwc/typography'
import { useDispatch, useSelector } from 'react-redux'
import { contributionDetails, postComment } from '../duckies'
import { useParams, useHistory } from 'react-router-dom'
import {formatTimeAgo} from "../../../common/utils/format/time";
import styled from "styled-components";
import {IconButton} from "@rmwc/icon-button";
import {Tooltip} from "@rmwc/tooltip";
import {TextField} from "@rmwc/textfield";
import {Button} from "@rmwc/button";
import {Card} from "@rmwc/card";
import {AskBadge} from "../../lists/components/ask-badge";
import {isLink} from "../../../common/utils/format/text";
import {ListToolbar} from "../../lists/components/list-toolbar";


export const ContributionForm = () => {
    const { id } = useParams()
    const history = useHistory()

    const dispatch = useDispatch()
    const contributionDetailsUI = useSelector((state) => state.contributionDetails[id])

    useEffect(() => {
        dispatch(contributionDetails(id))
    }, [id])

    const [textComment, setTextComment] = useState('')

    const createComment = () => dispatch(postComment({
        data: {
            parentId: id,
            text: textComment,
            h: history,
            contributionTopParentId: contributionDetailsUI.contributionTopParentId
        }
    }))

    const onCommentClick = () => {
        createComment()
    }

    return (
        <>
            <ListToolbar onClick={(pos) => {
                if (pos !== 5) {
                    history.push(`/?id=${pos}`)
                }
            }} pos={5}/>
            {!!contributionDetailsUI &&
            <ContributionDiv>
                <MainContributionDiv>
                    <TitleDiv>
                        <Tooltip content={contributionDetailsUI.liked ? 'Remove vote' : 'Upvote'}>
                            <IconButton
                                checked={contributionDetailsUI.liked}
                                onIcon="arrow_drop_down"
                                icon="arrow_drop_up"
                            />
                        </Tooltip>
                        {isLink(contributionDetailsUI.content) &&
                        <StyledTitle use="headline6" tag="a" href={contributionDetailsUI.content}>
                            {contributionDetailsUI.title}
                        </StyledTitle>}
                        {!isLink(contributionDetailsUI.content) &&
                        <StyledTitle use="headline6" tag="h2">
                            {contributionDetailsUI.title}
                        </StyledTitle>}


                    </TitleDiv>
                    <SubtitleDiv>
                        <StyledTitle use="caption" tag="c">
                            {contributionDetailsUI.points} points
                        </StyledTitle>
                        <StyledTitle use="caption" tag="c">
                            by {contributionDetailsUI.user.username}
                        </StyledTitle>
                        <StyledTitle use="caption" tag="c">
                            {formatTimeAgo(contributionDetailsUI.createdAt)} ago
                        </StyledTitle>
                        <StyledTitle use="caption" tag="c">
                            {contributionDetailsUI.comments.length} comments
                        </StyledTitle>
                    </SubtitleDiv>
                    <ContentDiv>
                        {!isLink(contributionDetailsUI.content) &&
                        <StyledTitle use="headline6">
                            {contributionDetailsUI.content}
                        </StyledTitle>}
                    </ContentDiv>
                    <CommentDiv>
                        <TextField label="Your text"
                                   textarea
                                   outlined
                                   rows={4}
                                   cols={80}
                                   helpText={{
                                       persistent: true,
                                       validationMsg: true,
                                   }}
                                   onChange={({target: {name, value}}) => {
                                       setTextComment(value)
                                   }}
                        />
                    </CommentDiv>
                    <AddCommentButtonDiv>
                        <StyledButton label='Add comment' raised
                                      theme={['secondaryBg', 'primary']}
                                      onClick={() => onCommentClick()}>
                        </StyledButton>
                    </AddCommentButtonDiv>
                </MainContributionDiv>

                {[...contributionDetailsUI.comments].map((comment) =>
                    <CommentContainer>
                        <SubtitleDiv>
                            <Tooltip content={contributionDetailsUI.liked ? 'Remove vote' : 'Upvote'}>
                                <IconButton
                                    checked={contributionDetailsUI.liked}
                                    onIcon="arrow_drop_down"
                                    icon="arrow_drop_up"
                                />
                            </Tooltip>
                            <StyledTitle use="caption" tag="c">
                                {comment.points} points
                            </StyledTitle>
                            <StyledTitle use="caption" tag="c">
                                {comment.user.username}
                            </StyledTitle>
                            <StyledTitle use="caption" tag="c">
                                {formatTimeAgo(comment.createdAt)} ago
                            </StyledTitle>
                        </SubtitleDiv>
                        <ContentDiv>
                            <StyledTitle use="subtitle2" tag="s2">
                                {comment.content}
                            </StyledTitle>
                        </ContentDiv>
                        <ReplyDiv>
                            <StyledTitle use="caption" tag="a" href={'/item/' + comment.id}>
                                reply
                            </StyledTitle>
                        </ReplyDiv>
                    </CommentContainer>
                )}
            </ContributionDiv>
            }
        </>
    )
}

const ContributionDiv = styled(Card)`
    padding: 20px;
    max-width: 1400px;
    float: none;
    margin: 0 auto; 
`

const MainContributionDiv = styled.div`
    border-bottom: 6px inset rgba(255,145,38,0.4);
    border-radius: 27px;
    padding: 10px;
`

const CommentContainer = styled.div`
    padding: 1rem; 
`

const TitleDiv = styled.div`
    display: flex;
`

const SubtitleDiv = styled.div`
    padding-top: 2px;
    display: flex;
`

const ContentDiv = styled.div`
    padding: 10px;
`

const ReplyDiv = styled.div`
    padding: 10px;
`

const CommentDiv = styled.div`
    padding: 12px;
`

const AddCommentButtonDiv = styled.div`
    margin-left: 10px;
`

const StyledButton = styled(Button)`
`

const StyledTitle = styled(Typography)`
    margin-left: 10px;
`
