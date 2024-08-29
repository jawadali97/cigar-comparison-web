import React, { useState, useCallback } from 'react';
import { TextField, CircularProgress, MenuItem, Autocomplete, Button, Box, InputAdornment } from '@mui/material';
import axiosInstance from '../services/axios';
import debounce from 'lodash/debounce'
import { apiRoutes } from '../app.constants';
import { Search } from '@mui/icons-material';

const SearchBox = ({ fetchQueriedProducts, setQuery }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const fetchSuggestions = async (query) => {
        if (query === '') {
            setOptions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.get(apiRoutes.suggestions, { params: { query } });
            // const data = response.data.map(item => ({ label: item.name, id: item._id }))
            const data = response.data.map(item => item.name)
            setOptions(data);
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        debouncedFetchSuggestions(newInputValue);
    };

    const handleOptionSelected = (event, newValue) => {
        setSelectedValue(newValue);
        setQuery(newValue)
    };

    const debouncedFetchSuggestions = useCallback(
        debounce((query) => {
            fetchSuggestions(query);
        }, 400),
        [] // ensures debounce is created only once
    );

    return (
        <Box
            display="flex"
            columnGap="30px"
            width="100%"
            justifyContent="center"
        >
            <Autocomplete
                sx={{ width: '80%' }}
                freeSolo
                value={selectedValue}
                onChange={handleOptionSelected}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        className='search-field'
                        {...params}
                        placeholder='Search cigar name'
                        variant="outlined"
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                            startAdornment: (<Search />)
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    const { key, id, ...optionProps } = props;
                    return (
                        <MenuItem key={id} {...optionProps}>
                            {key}
                        </MenuItem>)
                }}
            />
            <Button
                className='btn'
                variant='contained'
                size='small'
                sx={{ color: 'white' }}
                onClick={() => {
                    setQuery(inputValue)
                }}
            >Search</Button>
        </Box>
    );
};

export default SearchBox;