import React from 'react';
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader: React.FC = () => {
  return (
    <StyledLoaderWrapper>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={100}/>
      </Box>
    </StyledLoaderWrapper>
  );
}


const StyledLoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Loader;
