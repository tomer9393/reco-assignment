import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

function Table() {

    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'connector', headerName: 'Connector', width: 300 },
    ];
        
    const rows = [
        { id: 1, name: 'Tomer Israel' },
        { id: 2, name: 'Nitzn Israel' },
    ];
        
  return (
      <StyledTableWrapper>
        <DataGrid 
            rows={rows} 
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

export default Table;
