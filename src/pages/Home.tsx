import React from "react";
import styled from 'styled-components'
import AppInventoryTable from "../components/Table";

const Home: React.FC= () => {
    return (
    <StyledWrapper>
        <StyledHeadline>App Inventory</StyledHeadline>
        <AppInventoryTable ></AppInventoryTable>
    </StyledWrapper>
    );
}

const StyledHeadline = styled.h3`
    height: 26px;
    top: 30px;
    left: 87.5px;
    gap: 0px;
    font-size: 20px;
    font-weight: 500;
    line-height: 25.6px;
    color: #4C4C4C;
`
const StyledWrapper = styled.div`
    padding: 20px 60px;
`

export default Home;
  