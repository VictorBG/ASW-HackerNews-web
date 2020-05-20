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
import {isEmpty, isLink, isNotEmpty} from "../../../common/utils/format/text";
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
                        {isLink(contributionDetailsUI.content) &&
                        <StyledTitle use="headline6" tag="a" href={contributionDetailsUI.content}>
                            {contributionDetailsUI.title} ({contributionDetailsUI.content})
                        </StyledTitle>}
                        {!isLink(contributionDetailsUI.content) && isNotEmpty(contributionDetailsUI.title) &&
                        <StyledTitle use="headline6" tag="h2">
                            ASK HN: {contributionDetailsUI.title}
                        </StyledTitle>}
                    </TitleDiv>
                    <SubtitleDiv>
                        <Tooltip content={contributionDetailsUI.liked ? 'Remove vote' : 'Upvote'}>
                            <IconButton
                                checked={contributionDetailsUI.liked}
                                onIcon="arrow_drop_down"
                                icon="arrow_drop_up"
                            />
                        </Tooltip>
                        <StyledSubTitle use="caption" tag="c">
                            {contributionDetailsUI.points} points
                        </StyledSubTitle>
                        <StyledSubTitle use="caption" tag="a" href={'/user/' + contributionDetailsUI.user.id}>
                            by {contributionDetailsUI.user.username}
                        </StyledSubTitle>
                        <StyledSubTitle use="caption" tag="a" href={'/item/' + contributionDetailsUI.contributionTopParentId}>
                            {formatTimeAgo(contributionDetailsUI.createdAt)} ago
                        </StyledSubTitle>
                        <StyledSubTitle use="caption" tag="c">
                            {contributionDetailsUI.comments.length} comments
                        </StyledSubTitle>

                        {!isNotEmpty(contributionDetailsUI.title) &&
                        <StyledSubTitle use="caption" tag="a" href={'/item/' + contributionDetailsUI.contributionParentId}>
                            parent
                        </StyledSubTitle>}

                        {!isNotEmpty(contributionDetailsUI.title) &&
                        <StyledSubTitle use="caption" tag="a" href={'/item/' + contributionDetailsUI.contributionTopParentId}>
                            on: top parent
                        </StyledSubTitle>}

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

                    <CommentContainer style={{paddingLeft: comment.treeLength*2}}>
                        <SubtitleDiv>
                            <Tooltip content={contributionDetailsUI.liked ? 'Remove vote' : 'Upvote'}>
                                <IconButton
                                    checked={contributionDetailsUI.liked}
                                    onIcon="arrow_drop_down"
                                    icon="arrow_drop_up"
                                />
                            </Tooltip>
                            <StyledSubTitle use="caption" tag="c">
                                {comment.points} points
                            </StyledSubTitle>
                            <StyledSubTitle use="caption" tag="a" href={'/user/' + contributionDetailsUI.user.id}>
                                {comment.user.username}
                            </StyledSubTitle>
                            <StyledSubTitle use="caption" tag="a" href={'/item/' + comment.id}>
                                {formatTimeAgo(comment.createdAt)} ago
                            </StyledSubTitle>
                        </SubtitleDiv>
                        <ContentDiv>
                            <StyledTitle use="subtitle2" tag="s2">
                                {comment.content}
                            </StyledTitle>
                        </ContentDiv>
                        <ReplyDiv>
                            <StyledButton icon="bubble_chart" use="caption" tag="a" href={'/item/' + comment.id} theme={['onSecondary']}>
                                Reply
                            </StyledButton>
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
    border-radius: 27px;
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
    display: flex;
`

const ContentDiv = styled.div`

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
--mdc-typography-button-text-transform: none; 
`

const StyledTitle = styled(Typography)`
    margin-left: 10px;
`

const StyledSubTitle = styled(Typography)`
    margin-left: 10px;
    margin-top:15px;
`