import React, {useEffect } from "react";
import styled from 'styled-components'
import AppInventoryTable from "../components/Table";
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { setData, setLoading, setError } from '../store/appsInventorySlice';

const Home: React.FC= () => {

    const dispatch = useDispatch();
    const {data: fetchedData, loading: fetchLoading, error: fetchError , putData } = useFetch(
        '/api/v1/app-service/get-apps', 
        'PUT',
        {
        "pageNumber": 0,
        "pageSize": 25
        }
    );

    useEffect(() => {
        putData();
    }, [putData]);

    useEffect(() => {
    if (fetchLoading) {
        dispatch(setLoading());
    } else if (fetchedData) {
        console.log(fetchedData)
        dispatch(setData(fetchedData));
    } else if (fetchError) {
        dispatch(setError(fetchError));
    }
    }, [dispatch, fetchLoading, fetchedData, fetchError]);

    return (
    <StyledWrapper>
        <StyledHeadline>App Inventory</StyledHeadline>
        <AppInventoryTable></AppInventoryTable>
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
  