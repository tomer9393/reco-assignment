import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RecoLogoContainer from '../assets/reco-logo-container.svg?react';

function Table() {

    const { data, status, error } = useSelector((state: any) => state.appsInventory);

    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'connector', headerName: 'Connector', width: 300 },
    ];

    let inventory = [];
        
    if (status === 'loading') return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (data){
    inventory = data.appRows.map((app: any) => ({
        id: app.appId,
        name: app.appName,
        category: app.category,
        connector: <><RecoLogoContainer></RecoLogoContainer></>
    }))
    };

    return (
        <StyledTableWrapper>
        <DataGrid 
            rows={inventory} 
            columns={columns}
            pageSizeOptions={[25, 50]}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 25, page: 0 },
                },
                }}
            />
        </StyledTableWrapper>
    );
}

const StyledTableWrapper = styled.div`
    height: 400;
    width: 100%; 
    margin-top: 20;
`

const StyledRecoLogoContainer = styled(RecoLogoContainer)`
    // height: 20px;
    // width: 20px;
`

export default Table;
