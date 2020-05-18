import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection
} from '@rmwc/top-app-bar'
import React, {useCallback} from 'react'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

export const Toolbar = ({children, showUser = true}) => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const history = useHistory()

  const goToProfile = useCallback(() => {
    history.push(`/user/${user.id}`)
  }, [])


  return (<>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSectionFull>
              {children}
            </TopAppBarSectionFull>
            {!!showUser &&
            <TopAppBarSection alignEnd>
              <StyledUsernameText label= {`${user.username} (${user.karma})`}
                                  theme={['onSecondary']}
                                  onClick = {goToProfile}
                                  />
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

