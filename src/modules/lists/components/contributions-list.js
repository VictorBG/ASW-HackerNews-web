import React from 'react'
import {Card} from '@rmwc/card'
import {Typography} from '@rmwc/typography'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {formatTimeAgo} from '../../../common/utils/format/time'
import {AskBadge} from './ask-badge'
import {LinkBadge} from './link-badge'
import {isLink} from '../../../common/utils/format/text'
import {IconButton} from '@rmwc/icon-button'
import {Tooltip} from '@rmwc/tooltip'
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {checkVote, fetchList} from "../duckies";

export const ContributionsList = ({list, indexList}) => {

    const history = useHistory()

    const dispatch = useDispatch()

    const goToProfile = (id) => {
        history.push(`/user/${id}`)
    }

    const onClickButton = (item) => (dispatch(checkVote(item, fetchList(indexList))))

    return (
        <>
            {list.map(item =>
                <ContributionCard key={item.id}>
                    <LikeContainer>
                        <Tooltip content={item.liked ? 'Remove vote' : 'Upvote'}>
                            <IconButton
                                checked={item.liked}
                                onIcon="arrow_drop_down"
                                icon="arrow_drop_up"
                                onClick={() => onClickButton(item)}
                            />
                        </Tooltip>
                        <Typography use='headline5' tag='div'>{item.points}</Typography>
                    </LikeContainer>
                    <CardContainer>
                        <AskBadge content={item.content}/>
                        {isLink(item.content) &&
                        <StyledTitle use="headline6" tag="a" href={item.content}>
                            {item.title}
                        </StyledTitle>}
                        {!isLink(item.content) &&
                        <StyledTitle use="headline6" tag="h2">
                            {item.title}
                        </StyledTitle>}

                        <LinkBadge content={item.content}/>
                        <CardContent>
                            <StyledUsernameButton
                                label={item.user.username}
                                icon="person_outline"
                                onClick={() => goToProfile(item.user.id)}
                                theme={['onSecondary']}/>
                            <StyledTimeButton
                                label={formatTimeAgo(item.createdAt)}
                                icon="schedule"
                                theme={['onSecondary']}
                                disabled/>
                            <StyledCommentsButton
                                tag="a"
                                label={item.commentsLength === 0
                                    ? 'discuss'
                                    : item.commentsLength + ' comment' + (item.commentsLength !== 1 ? 's' : '')}
                                icon="bubble_chart"
                                onClick={() => {
                                    history.push(`/item/${item.id}`)
                                }}
                                theme={['onSecondary']}/>
                        </CardContent>
                    </CardContainer>
                </ContributionCard>
            )}
        </>
    )
}


const ContributionCard = styled(Card)`
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
`

const CardContainer = styled.div`
    padding: 1rem; 
`

const LikeContainer = styled.div`
    padding: 10px;
    text-align: center;
`

const StyledUsernameButton = styled(Button)`
    --mdc-typography-button-text-transform: none; 
`

const StyledTimeButton = styled(Button)`
    --mdc-typography-button-text-transform: none; 
     margin-left: 20px;
`

const StyledCommentsButton = styled(Button)`
    --mdc-typography-button-text-transform: none; 
     margin-left: 20px;
`

const StyledTitle = styled(Typography)`
    margin-left: 10px;
    color: black;
`

const CardContent = styled.div`
    margin-top: 20px;
`
