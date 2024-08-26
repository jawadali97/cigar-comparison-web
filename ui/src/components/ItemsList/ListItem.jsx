import { Box, Button, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import './ListItem.css'
import VerticalTable from './VerticalTable'

const ListItem = ({ item }) => {
    return (
        <Box sx={{
            border: '1px solid #EEEEEE',
            padding: '0 30px 20px',
            minWidth: '60%',
            // maxWidth: '70%'
        }}>
            {/* <h2 style={{ color: '#00ADB5' }}>{item.name}</h2> */}
            {/* <Box
                display='flex'
                flexWrap='wrap'
                flexGrow={1}
                justifyContent='space-between'
            > */}
            <Typography sx={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#00ADB5',
                p: '10px  0'
            }}>
                {item.name}
            </Typography>
            {/* <h2>{item.site_name}</h2>
            </Box> */}
            <Grid container spacing={3} alignItems='end'>
                <Grid item xs={12} md={5}
                // borderRight='3px solid #EEEEEE'
                >
                    {/* <Typography sx={{
                        fontSize: '1.25rem',
                        p: '5px 0',
                        fontWeight: '700',
                        color: '#888',

                    }}>
                        Specifications
                    </Typography> */}
                    {/* <h2>Specifications</h2> */}
                    <Grid container spacing={2} columnSpacing={5}>
                        <Grid item xs={12} md={6}>
                            <div ><strong>Brand: </strong>{item?.brand || '-'}</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div><strong>Length: </strong>{item?.length || '-'}</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div><strong>Ring: </strong>{item?.ring || '-'}</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div><strong>Shape: </strong>{item?.shape || '-'}</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div><strong>Strength: </strong>{item?.strength || '-'}</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div><strong>Origin: </strong>{item?.origin || '-'}</div>
                        </Grid>
                        {/* <Grid item xs={12} md={6} display='grid' rowGap='10px'>
                            {item?.brand && <div ><strong>Brand: </strong>{item?.brand}</div>}
                            {item?.length && <div><strong>Length: </strong>{item?.length}</div>}
                            {item?.ring && <div><strong>Ring: </strong>{item?.ring}</div>}
                        </Grid>
                        <Grid item xs={12} md={6} display='grid' rowGap='10px'>
                            {item?.shape && <div><strong>Shape: </strong>{item?.shape}</div>}
                            {item?.strength && <div><strong>Strength: </strong>{item?.strength}</div>}
                            {item?.origin && <div><strong>Origin: </strong>{item?.origin}</div>}
                        </Grid> */}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={5}>
                    {/* <VerticalTable data={item} /> */}
                    <table className='packs-table'>
                        <thead className='packs-tb-head'>
                            <tr>
                                <th>Qty</th>
                                <th>Availability</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.packs.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td style={{ color: row.availability.toLowerCase().replace(' ', '').includes('instock') ? 'green' : 'red' }}>{row.availability}</td>
                                    <td>{row.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>

                <Grid item xs={12} md={2}
                    sx={{
                        alignSelf: { xs: 'end', md: 'center' },
                        flexDirection: 'column',
                        display: 'flex',
                        justifyContent: { xs: 'end', md: 'center' }
                    }}>
                    <h2 className='brand'>{item.site_name}</h2>
                    <Link
                        sx={{
                            background: '#00ADB5',
                            margin: { xs: '0 10%', md: '0 5%' },
                            // padding: { xs: '8px 12px', md: '10px 15px' },
                            p: '8px 15px',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: { xs: 'none', md: '600' },
                            fontSize: '1rem',
                            textAlign: 'center'
                        }}
                        underline="none"
                        href={item.prod_url}
                        target="_blank"
                    >
                        Visit Store
                    </Link>
                </Grid>
            </Grid>
        </Box >

        // <TableRow
        // // key={index}
        // // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        // >
        //     {/* <TableCell component="td" scope="row">{item.site_name}</TableCell> */}
        //     <TableCell>
        //         <Box>
        //             <h2 style={{ color: '#00ADB5' }}>{item.name}</h2>
        //             <Box
        //                 display='flex'
        //                 columnGap='10px'
        //                 justifyContent='space-between'
        //             >
        //                 <div style={{
        //                     width: '50%',
        //                     display: 'flex',
        //                     justifyContent: 'space-between',
        //                     borderRight: '3px solid #EEEEEE',
        //                     // borderRadius: '50px',
        //                     paddingRight: '30px'
        //                 }}>
        //                     <div>
        //                         <div><strong>Brand: </strong>{item?.brand}</div>
        //                         <div><strong>Length: </strong>{item?.length}</div>
        //                         <div><strong>Ring: </strong>{item?.ring}</div>
        //                     </div>
        //                     <div>
        //                         <div><strong>Shape: </strong>{item?.shape}</div>
        //                         <div><strong>Strength: </strong>{item?.strength}</div>
        //                         <div><strong>Origin: </strong>{item?.origin}</div>
        //                     </div>
        //                 </div>

        //                 <table className='packs-table'>
        //                     <thead className='packs-tb-head'>
        //                         <tr>
        //                             <th>Qty</th>
        //                             <th>Availability</th>
        //                             <th>Price</th>
        //                         </tr>
        //                     </thead>

        //                     <tbody>
        //                         {item.packs.map((row, index) => (
        //                             <tr key={index}>
        //                                 <td>{row.name}</td>
        //                                 <td style={{ color: 'green' }}>{row.availability}</td>
        //                                 <td>{row.price}</td>
        //                             </tr>
        //                         ))}

        //                     </tbody>
        //                 </table>
        //             </Box>
        //         </Box>
        //     </TableCell>
        //     {/* <TableCell align="center">
        //         <Link
        //             sx={{
        //                 background: '#00ADB5',
        //                 padding: '10px 15px',
        //                 border: 'none',
        //                 borderRadius: '50px',
        //                 color: 'white'
        //             }}
        //             underline="none"
        //             href={item.prod_url}
        //             target="_blank"
        //         >
        //             Visit Store
        //         </Link>
        //     </TableCell> */}
        // </TableRow>
    )
    // return (
    //     <Table>
    //         {/* <TableHead>
    //             <TableRow>
    //                 <TableCell>Retailer</TableCell>
    //                 <TableCell align="center">Cigar Details</TableCell>
    //                 <TableCell align="center">Action</TableCell>
    //             </TableRow>
    //         </TableHead> */}
    //         <TableBody>
    //             <TableRow
    //             // key={index}
    //             // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //             >
    //                 <TableCell component="td" scope="row">{item.site_name}</TableCell>
    //                 <TableCell>
    //                     <Box>
    //                         <h3>{item.name}</h3>
    //                         <table>
    //                             <thead>
    //                                 <tr>
    //                                     <th></th>
    //                                     <th>Availability</th>
    //                                     <th>Price</th>
    //                                 </tr>
    //                             </thead>

    //                             <tbody>
    //                                 {item.packs.map((row, index) => (
    //                                     <tr key={index}>
    //                                         <td>{row.name}</td>
    //                                         <td>{row.availability}</td>
    //                                         <td>{row.price}</td>
    //                                     </tr>
    //                                 ))}

    //                             </tbody>
    //                         </table>
    //                         {/* <Table size='small'>
    //                             <TableHead>
    //                                 <TableRow>
    //                                     <TableCell sx={{ color: 'red' }}>Name</TableCell>
    //                                     <TableCell align="right">Availability</TableCell>
    //                                     <TableCell align="right">Price</TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {item.packs.map((row, index) => (
    //                                     <TableRow
    //                                         key={index}
    //                                     // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                                     >
    //                                         <TableCell component="td" scope="row">
    //                                             {row.name}
    //                                         </TableCell>
    //                                         <TableCell align="right">{row.availability}</TableCell>
    //                                         <TableCell align="right">{row.price}</TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table> */}
    //                     </Box>
    //                 </TableCell>
    //                 <TableCell align="center">
    //                     <Link
    //                         sx={{
    //                             background: '#00ADB5',
    //                             padding: '10px 15px',
    //                             border: 'none',
    //                             borderRadius: '50px',
    //                             color: 'white'
    //                         }}
    //                         underline="none"
    //                         href={item.prod_url}
    //                         target="_blank"
    //                     >
    //                         Visit Store
    //                     </Link>
    //                 </TableCell>
    //             </TableRow>
    //         </TableBody>
    //     </Table>


    // )
}

export default ListItem
