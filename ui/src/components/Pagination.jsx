import { PaginationItem, Pagination, TablePagination, Box } from '@mui/material'
import React, { useEffect } from 'react'

const PaginationComponent = ({ page, totalPages, setPage, totalRecords, startItems, endItems }) => {

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', md: 'space-between' },
            p: '10px',
            alignItems: 'center',
            rowGap: { xs: '20px', md: '0' },
        }}>
            <div>
                <span>Showing items </span>
                <b>{startItems || 1}</b> - <b>{endItems}</b> of <b>{totalRecords}</b>
            </div>
            <Pagination
                count={totalPages}
                shape="rounded"
                page={page}
                onChange={handlePageChange}
                defaultPage={1}
                siblingCount={1}
                boundaryCount={1}
            />
        </Box>
    );
}

export default PaginationComponent