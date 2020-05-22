import {getDomain, isLink, sanitizeUrl} from '../../../common/utils/format/text'
import { Typography } from '@rmwc/typography'
import styled from 'styled-components'
import React from 'react'

export const LinkBadge = ({ content }) => (
    <>
        {isLink(content) &&
        <BadgeContainer>
            <Typography
                use='body2'
                tag='a'
                target="_blank"
                href={sanitizeUrl(content)}
                className='link'
                theme={['link']}>
                ({getDomain(content)})
            </Typography>
        </BadgeContainer>}
    </>
)

const BadgeContainer = styled.span`
    padding: 5px;
`
