import React, { useEffect } from 'react';
import { Typography, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { styled as muiStyled} from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../store/store';
import CloseIcon from '@mui/icons-material/Close';
import RecoLogoContainer from '../assets/reco-logo-container.svg?react';
import { fetchAppData } from '../store/appDetailsSlice';
import Loader from './Loader';

interface AppDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AppDetailsDrawer: React.FC<AppDetailsDrawerProps> = ({ open, onClose }) => {

    const dispatch = useAppDispatch();
    const { selectedApp, appData, status } = useAppSelector((state: any) => state.appDetails);

    useEffect(() => {
        if (selectedApp) {
            dispatch(fetchAppData(selectedApp.id));
        }
    }, [dispatch, selectedApp]);

    return (
        <AnimatePresence>
            {open && (
            <>
            {/* Animate the StyledBackdrop with fade-in and fade-out effect */}
            <StyledBackdrop
                key={'StyledBackdrop'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
            />

            {/* Animate the StyledDrawer for sliding drawer with spring animation */}
            <StyledDrawer
                key={'drawer'}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                type: 'spring',
                mass: 1,
                stiffness: 300,
                damping: 30,
                }}
            >

                {
                status == "loading" ? 
                <Loader/> :
                status == "succeeded" || status == "idle" ?
                <>
                <StyledAppOverviewWrapper>
                    <StyledHeadlineWrapper>
                        <StyledHeadline>App overview</StyledHeadline>
                        <StyledCloseButton onClick={onClose}><CloseIcon fontSize='inherit'/></StyledCloseButton>
                    </StyledHeadlineWrapper>
                    <StyledLogoWrapper>
                        <StyledAvatar alt={appData?.name} src={`src/assets/${appData?.name?.toLowerCase()}.svg`} />
                        <StyledAppName>{appData?.name}</StyledAppName>
                    </StyledLogoWrapper>
                <StyledAppDetailsBox>
                    <StyledAppDetails>
                        <StyledAppDetailsText>App name: {appData?.name}</StyledAppDetailsText>
                        <StyledAppDetailsText>Category: {appData?.category}</StyledAppDetailsText>
                        <StyledAppDetailsText>Users: {appData?.users.length}</StyledAppDetailsText>
                        <StyledConnectorLogoWrapper>
                            <StyledAppDetailsText>Connector: </StyledAppDetailsText>
                            <StyledRecoLogo/>
                        </StyledConnectorLogoWrapper>
                        <StyledAppDetailsText>Last classification: 2 days ago</StyledAppDetailsText>
                    </StyledAppDetails>
                </StyledAppDetailsBox>
                </StyledAppOverviewWrapper>
                <StyledUserListBox>
                    <StyledUserListRow>Username</StyledUserListRow>
                    <StyledUserListRow key={0}>
                            <StyledAvatar alt="Tomer Israel" src="src/assets/tomer-avatar.jpeg" />
                            <Typography>tomer.israel@reco.com</Typography>
                    </StyledUserListRow>
                    {
                        appData ? appData?.users?.map((user: string, index: number) => (
                            <StyledUserListRow key={index+1}>
                                <StyledAvatar alt={user} />
                                <Typography>{user}</Typography>
                            </StyledUserListRow>
                        )) : <></>
                    }
                </StyledUserListBox>
                </> : <Typography color={'error'} variant="h4"> Failed to fetch app data </Typography>
                }
            </StyledDrawer>
            </>
            )}
        </AnimatePresence>
  );
};

const StyledBackdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1300;
`;

const StyledDrawer = styled(motion.div)`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 21px 29px;
    gap: 24px;
    top: 57px;
    background: #FAFAFA;
    border: 1px solid #DCDCDC;
    position: absolute;
    right: 0;
    height: 100%;
    width: 40%;
    z-index: 1400;
    box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
`

const StyledAppOverviewWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 10px;
`
const StyledCloseButton = styled.button`
    all: unset;

    cursor: pointer;
    height: 16px;
    width: 16px;
    color: #4C4C4C;
`

const StyledHeadline = styled.p`
    color: #4C4C4C;
    font-weight: 600;
    font-size: 16px;
    line-height: 145.69%;
    margin:0;
`

const StyledHeadlineWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledAppDetailsBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 10px;
    height: 180px;
    background: rgba(62, 116, 255, 0.05);
    border: 1px solid #3E74FF;
    border-radius: 4px;

    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;

`

const StyledAppDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;  
`
const StyledAppDetailsText = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 144%;
    display: flex;
    align-items: center;
    color: #4C4C4C;
    margin: 0;
`

const StyledAppName = styled.p`
    width: 42px;
    height: 23px;
    color: #717171;
`

const StyledAvatar = muiStyled(Avatar)({
    height: '22px',
    width: '22px',
    alignItems: 'flex-end',
    marginRight: 1
});

const StyledRecoLogo = styled(RecoLogoContainer)`
    height:20px;
    width:20px;
`

const StyledLogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 74px;
    height: 23px;
    flex: none;
    order: 1;
    flex-grow: 0;
`

const StyledConnectorLogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
    flex: none;
`

const StyledUserListBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    overflow-y: auto;

    height: 520px;

    border: 1px solid #E8E9FF;
    border-radius: 8px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
`

const StyledUserListRow = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 8px;
    height: 52px;
    color:#222425;

    background: #FFFFFF;
    border-bottom: 1px solid #E8E9FF;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`

export default AppDetailsDrawer;