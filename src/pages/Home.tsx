import React from "react";
import styled from 'styled-components'
import Table from "../components/Table";

function Home() {
    return (
    <StyledWrapper>
        <StyledHeadline>App Inventory</StyledHeadline>
        <Table></Table>
    </StyledWrapper>
    );
}

const StyledHeadline = styled.h3`
    // width: 124px;
    height: 26px;
    top: 30px;
    left: 87.5px;
    gap: 0px;
    // opacity: 0px;
    // font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 25.6px;
    // text-align: center;
    color: #4C4C4C;
`
const StyledWrapper = styled.div`
    // height: 100%;
    // width: 100%;
    padding: 20px 60px;
`

export default Home;
  