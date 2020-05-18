import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection
} from '@rmwc/top-app-bar'
import React from 'react'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {useSelector} from "react-redux";

export const Toolbar = ({children, showUser = true}) => {

  const user = useSelector((state) => state.user)

  return (<>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSectionFull>
              {children}
            </TopAppBarSectionFull>
            {!!showUser &&
            <TopAppBarSection alignEnd>
              <StyledUsernameText label= {`${user.username} (${user.karma})`}
                                  theme={['onSecondary']}/>
            </TopAppBarSection>
            }
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
      </>
  )

}

const TopAppBarSectionFull = styled(TopAppBarSection)`
    width: 100vw;
`

const StyledUsernameText = styled(Button)`
    --mdc-typography-button-text-transform: none; 
    white-space: nowrap;
`

