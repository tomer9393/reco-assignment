import React, { useState, useEffect } from 'react';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../store/store';
import styled from 'styled-components';
import { Typography, Avatar } from '@mui/material';
import RecoLogoContainer from '../assets/reco-logo-container.svg?react';
import AppDetailsDrawer from './Drawer';
import { fetchAppsInventory, setPageNumber, setPageSize } from '../store/appsInventorySlice';
import { handleSelectApp } from '../store/appDetailsSlice';
import Loader from './Loader';

// mockData
const rows = [
    { id: 1, name: 'Zoom', category: 'Video Conferencing' },
    { id: 2, name: 'Slack', category: 'IM' },
    { id: 3, name: 'XSOAR', category: 'Security Automation' },
    { id: 4, name: 'Torq', category: 'Security Automation' },
    { id: 5, name: 'Virtu', category: 'Financial' },
    { id: 6, name: 'Tines', category: 'Automation' },
    { id: 7, name: 'Splunk', category: 'Monitoring' },
    { id: 8, name: 'Sharepoint', category: 'Drive' },
    { id: 9, name: 'ServiceNow', category: 'Cloud' },
];

const AppInventoryTable: React.FC = () => {

    const dispatch = useAppDispatch();
    const { data, status, error, pageNumber, pageSize, totalCount  } = useAppSelector((state: any) => state.appsInventory);

    const [appInventory, setAppInventory] = useState(rows)
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAppsInventory({ pageNumber, pageSize }));
    }, [dispatch, pageNumber, pageSize]);

    // if data fetched update the local state to use real data insted of mock
    useEffect(() => {
        if (data){
            const inventory = data.map((app: any) => ({
                id: app.appId,
                name: app.appName,
                category: app.category,
            }))
            setAppInventory(inventory)
        };
    }, [data]);

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        if (model.page !== pageNumber) {
          dispatch(setPageNumber(model.page));
        }
        if (model.pageSize !== pageSize) {
          dispatch(setPageSize(model.pageSize));
        }
    };

    const handleRowClick = (params: any) => {
        dispatch(handleSelectApp(params.row));
        setDrawerOpen(true);
    };
  
    const handleCloseDrawer = () => {
        dispatch(handleSelectApp(null));
        setDrawerOpen(false);
    };

    const columns = [
        { field: 'name',
          headerName: 'Name', 
          width: 300,
          display: 'flex',
          renderCell: (params: any) => {
            const src = `src/assets/${params.value.toLowerCase()}.svg`
            return (
                <>
                <Avatar sx={{ marginRight: 1 }} alt={params.value} src={src} />
                <Typography sx={{fontSize: '0.875rem', fontWeight: 400}}>{params.value}</Typography>
                </>
            )},
        },
        { field: 'category',
          headerName: 'Category', 
          width: 300 
        },
        {
          field: 'connector',
          headerName: 'Connector',
          width: 300,
          display: 'flex',
          renderCell: () => <RecoLogoContainer/>,
        },
      ];

        
    if (status === 'loading') return (<StyledLoaderWrapper><Loader/></StyledLoaderWrapper>);

    return (
        <StyledTableWrapper>
            {
                error && 
                    <StyledErrorMessageWrapper>
                        <Typography color="error" variant='h5'> Failed to fetch new data, please try again...</Typography>
                    </StyledErrorMessageWrapper>
            }
            <DataGrid 
                rows={appInventory}
                rowHeight={60}
                columns={columns}
                disableColumnMenu
                onRowClick={handleRowClick}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                pageSizeOptions={[25, 50]}
                paginationModel={{ page: pageNumber, pageSize: pageSize }}
                onPaginationModelChange={handlePaginationModelChange}
            />
            <AppDetailsDrawer open={drawerOpen} onClose={handleCloseDrawer}/>
        </StyledTableWrapper>
    );
}

const StyledTableWrapper = styled.div`
    height: 400;
    width: 100%; 
    margin-top: 20;
`

const StyledLoaderWrapper = styled.div`
    height: 100vh;
    width: 100%; 
`

const StyledErrorMessageWrapper = styled.div`
    margin-bottom: 20px;
`

export default AppInventoryTable;
