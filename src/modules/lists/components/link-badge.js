import { getDomain, isLink } from '../../../common/utils/format/text'
import { Typography } from '@rmwc/typography'
import styled from 'styled-components'
import React from 'react'
import { Icon } from '@rmwc/icon'

export const LinkBadge = ({ content }) => (
    <>
        {isLink(content) &&
        <BadgeContainer>
            <Typography
                use='body2'
                tag='a'
                href={content}
                className='link'
                theme={['link']}>
                ({getDomain(content)})
            </Typography>
        </BadgeContainer>}
    </>
)

const BadgeContainer = styled.a`
    padding: 5px;
`

const IconLink = styled(Icon)`
    height: 18px;
    width: 18px;
`
