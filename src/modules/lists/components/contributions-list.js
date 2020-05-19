import React from 'react'
import { Card } from '@rmwc/card'
import { Typography } from '@rmwc/typography'
import styled from 'styled-components'
import { Button } from '@rmwc/button'
import { formatTimeAgo } from '../../../common/utils/format/time'
import { AskBadge } from './ask-badge'
import { LinkBadge } from './link-badge'
import { isLink } from '../../../common/utils/format/text'
import { IconButton } from '@rmwc/icon-button'
import { Tooltip } from '@rmwc/tooltip'
import { useHistory } from 'react-router-dom'

export const ContributionsList = ({ list }) => {
    const history = useHistory()
    return (
        <>
            {list.map(item =>
                <ContributionCard>
                    <LikeContainer>
                        <Tooltip content={item.liked ? 'Remove vote' : 'Upvote'}>
                            <IconButton
                                checked={item.liked}
                                onIcon="arrow_drop_down"
                                icon="arrow_drop_up"
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
                                theme={['onSecondary']}>
                            </StyledCommentsButton>
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
