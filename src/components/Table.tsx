import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Typography, Avatar } from '@mui/material';
import RecoLogoContainer from '../assets/reco-logo-container.svg?react';
import AppDetailsDrawer from './Drawer';

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

    const { data, status, error } = useSelector((state: any) => state.appsInventory);
    const [ inventory, setInventory ] = useState(rows)

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<any>(null);
  
    const handleRowClick = (params: any) => {
      setSelectedApp(params.row);
      setDrawerOpen(true);
    };
  
    const closeDrawer = () => {
      setDrawerOpen(false);
      setSelectedApp(null);
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

        
    if (status === 'loading') return <p>Loading...</p>;

    // Uncomment when data fetching will be fixed
    // if (error) return <p>Error: {error}</p>;

    if (data){
        const inventory = data.appRows.map((app: any) => ({
            id: app.appId,
            name: app.appName,
            category: app.category,
        }))
        setInventory(inventory)
    };

    return (
        <StyledTableWrapper>
        <DataGrid 
            rows={inventory}
            rowHeight={60}
            columns={columns}
            disableColumnMenu
            onRowClick={handleRowClick}
            pageSizeOptions={[25, 50]}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 25, page: 0 },
                },
                }}
            />
        <AppDetailsDrawer open={drawerOpen} onClose={closeDrawer} appDetails={selectedApp} />
        </StyledTableWrapper>
    );
}

const StyledTableWrapper = styled.div`
    height: 400;
    width: 100%; 
    margin-top: 20;
`

export default AppInventoryTable;
