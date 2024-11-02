import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { styled as muiStyled} from '@mui/material/styles';
import styled from 'styled-components';
import { Tabs, Tab, Box, Avatar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecoLogo from '../assets/reco-logo.svg?react';
import HelpIcon from '../assets/help.svg?react';

interface StyledTabProps {
  label: string;
}

const pages = ['Apps', 'Data', 'Identities','Alerts','Investigation Center','Configurations'];

const AppBar: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    handleNavigate(pages[newValue])
  };

  const handleNavigate = (page: string) => {
    let dest = "/";
    if(page !== "Apps"){
      dest = `/${page}`
    }
    navigate(dest)
  }

  return (
    <StyledAppBar>
      <StyledTabsWrapper>
        <StyledLogoWrapper>
          <StyledRecoLogo/>
        </StyledLogoWrapper>
        <StyledTabList value={activeTab} onChange={handleTabChange}>
        {pages.map((page) => (
              <StyledTab
                key={page}
                label={page}
              />
            ))}
        </StyledTabList>
        </StyledTabsWrapper>
        <StyledTabsWrapper>
        <StyledProfileMenuWrapper >
              <StyledAvatar alt="Tomer Israel" src="src/assets/tomer-avatar.jpeg" />
              <StyledProfileNameWrapper>
                <Typography>Security-Demo 2 </Typography>
                <KeyboardArrowDownIcon/>
              </StyledProfileNameWrapper>
              <HelpIcon/>
          </StyledProfileMenuWrapper>
        </StyledTabsWrapper>
    </StyledAppBar>
  );
}

const StyledAppBar = muiStyled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 24px',
  gap: '48px',
  height: '56px',
  background: '#1F5CED',
  borderBottom: '1px solid #1F5CED',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 0,
  zIndex: 1
});

const StyledTabsWrapper = muiStyled(Box)({
    display: 'flex',
    alignItems: 'center'
});

const StyledProfileMenuWrapper = muiStyled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const StyledProfileNameWrapper = muiStyled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px'
});

const StyledTabList = muiStyled(Tabs)({
  '& .MuiTabs-indicator': {
    height: '5px',
    width: '101px',
    backgroundColor: '#F4F6FF'
  },
});

const StyledTab = muiStyled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    padding: '16px 24px',
    gap: '2px',
    width: 'max-content',
    height: '56px',
    textTransform: 'none',
    minWidth: 100,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: '#F4F6FF',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#F4F6FF',
      opacity: 1,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-selected': {
      color: '#F4F6FF',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

const StyledAvatar = muiStyled(Avatar)({
  height: '25px',
  width: '25px'
});

const StyledLogoWrapper = styled.div`
  width: 80px;
  height: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;

`

const StyledRecoLogo = styled(RecoLogo)`
  height: 20px;
  width: 40px;
`

export default AppBar;