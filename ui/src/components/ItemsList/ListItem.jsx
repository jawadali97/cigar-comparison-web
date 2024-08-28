import { Box, Grid, Link, Typography } from '@mui/material'
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
            <Typography sx={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#00ADB5',
                p: '10px  0'
            }}>
                {item.name}
            </Typography>
            <Grid container spacing={3} alignItems='end'>
                <Grid item xs={12} md={5}
                >
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
                    <h2 className='site-name'>{item.site_name}</h2>
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
    )
}

export default ListItem
