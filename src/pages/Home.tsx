import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import Table from "../components/Table";
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { setData, setLoading, setError } from '../store/appsInventorySlice';

function Home() {

    const [pageNumber, setPageNumber] = useState(0);
    const dispatch = useDispatch();
    const {data: fetchedData, loading: fetchLoading, error: fetchError , putData } = useFetch('/api/v1/app-service/get-apps', 'PUT',{
    "pageNumber": 0,
    "pageSize": 25
    });

    useEffect(() => {
    putData();
    }, []);

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

    //   if (status === 'loading') return <p>Loading...</p>;
    //   if (error) return <p>Error: {error}</p>;

    //   if (data){
    //     console.log(data)
    //   };

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
  