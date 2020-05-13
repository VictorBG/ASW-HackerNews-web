import { isLink } from '../../../common/utils/format/text'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '@rmwc/typography'

export const AskBadge = ({ content }) => (
    <>
        {!isLink(content) &&
        <BadgeContainer>
            <Typography
                use='button'
                theme={['primary']}>Ask HN
            </Typography>
        </BadgeContainer>}
    </>
)

const BadgeContainer = styled.a`
    background: var(--mdc-theme-secondary);
    border-radius: 4px;
    padding: 5px;
`
