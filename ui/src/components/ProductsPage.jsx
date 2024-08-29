import React, { useEffect, useState } from "react"
import './ProductsPage.css'
import { Box, selectClasses, Typography } from "@mui/material";
import SearchBox from "./SearchBox";
import ItemsList from "./ItemsList/ItemsList";
import axiosInstance from "../services/axios";
import { apiRoutes } from "../app.constants";
import Filters from "./Filters";

const ProductsPage = ({ }) => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [skipItems, setSkipItems] = useState(0);
    const [query, setQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        brand: [],
        length: [],
        ring: [],
        strength: [],
        origin: [],
        shape: []
    });

    useEffect(() => {
        fetchQueriedProducts(query);
    }, [page, query, selectedFilters]);

    useEffect(() => {
        fetchQueriedProducts(query);
        setPage(1)
    }, [selectedFilters]);

    const fetchQueriedProducts = async (query) => {
        try {
            const response = await axiosInstance.get(apiRoutes.search, { params: { query, ...selectedFilters, page, limit: 20 } });
            setProducts(response.data.cigars);
            setTotalPages(response.data.totalPages);
            setTotalRecords(response.data.totalRecords)
            setSkipItems(response.data.skip)
            window.scrollTo({ top: 0 })
        } catch (error) {
            console.error('Error fetching queried products:', error);
        }
    };

    return (
        <div className="main-container">
            <div className="search-wrap">
                <SearchBox setQuery={setQuery} />
                <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>

            <Box sx={{
                background: 'white',
                // padding: '50px 10px 20px 10px',
                padding: '3% 10% 20px 10%',
                textAlign: 'start',
                borderBottom: '1px solid #EEEEEE',
            }}>
                <Typography sx={{
                    // color: 'white',
                    color: '#00ADB5',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                }}>
                    Cigar Search
                </Typography>

                <Typography sx={{
                    // color: '#black'
                    fontSize: '0.8rem'
                }}>
                    Not to toot our own horn here or anything, but our cigar humidor is so big, it almost sounds like the
                    beginning of a fat joke. Maybe that's why you're here - variety. Or maybe it's because you know what you
                    want, and you're just hoping we can cut you a sweetheart of a deal on your favorite cigars. Either way,
                    that's why we make the cigar search process so easy here at CigarMatrix - give you a head-spinningly profuse
                    number of smokes to choose from, and slash the prices of each so deep, it's nearly impossible for you to
                    want to buy them anywhere else. You deserve to get more than what you pay for, and that's how we roll.
                    So here's the bottom line: you're awesome. We're awesome. Let's search for cigars together and be friends.
                </Typography>
            </Box>

            <Box sx={{
                padding: { xs: '0', md: '0 10%' },
                background: '#EEEEEE',
                // margin: '20px 0'
            }}>
                <ItemsList
                    itemsList={products}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    totalRecords={totalRecords}
                    startItems={skipItems}
                />
            </Box>
        </div>
    );
}

export default ProductsPage;


// const dataItem = {
//     "_id": {
//         "$oid": "66c11fdf7e10dc4db93f4013"
//     },
//     "unique_id": "flordelasantillastoro6*52",
//     "brand": "Flor de las Antillas",
//     "length": "6\"",
//     "name": "Flor de las Antillas Toro 6\" * 52",
//     "origin": "Nicaragua",
//     "packs": [
//         {
//             "name": "Box of 20",
//             "availability": "In stock",
//             "price": "$161.95"
//         },
//         {
//             "name": "Single",
//             "availability": "In stock",
//             "price": "$8.55"
//         }
//     ],
//     "prod_url": "https://www.neptunecigar.com/cigars/flor-de-las-antillas-toro",
//     "ring": "52",
//     "scraped_at": {
//         "$date": "2024-08-17T22:09:34.274Z"
//     },
//     "shape": "Toro",
//     "site_name": "Neptune Cigar",
//     "strength": "Medium"
// }