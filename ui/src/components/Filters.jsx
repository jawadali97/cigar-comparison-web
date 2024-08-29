import { Autocomplete, Box, Checkbox, Chip, Popper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import axiosInstance from '../services/axios';
import { apiRoutes, filtersValues } from '../app.constants';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'

const CustomPopper = (props) => {
    const { anchorEl, open, ...rest } = props;
    const popperRef = useRef(null);

    useEffect(() => {
        if (anchorEl && open) {
            const width = anchorEl.clientWidth;
            if (popperRef.current) {
                popperRef.current.style.width = `${width}px`;
            }
        }
    }, [anchorEl, open]);

    return <Popper {...props} ref={popperRef} />;
};


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const Filters = ({ selectedFilters, setSelectedFilters }) => {
    const [uniqueAttributes, setUniqueAttributes] = useState({
        brands: [],
        lengths: [],
        rings: [],
        strengths: [],
        origins: [],
        shapes: []
    });

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const response = await axiosInstance.get(apiRoutes.filters);
                const data = {};
                Object.entries(response.data).forEach(([key, value]) => {
                    data[key] = value.map(val => capitalize(val))
                })
                setUniqueAttributes(data);
            } catch (error) {
                console.error('Error fetching unique attributes:', error);
            }
        };
        fetchAttributes();
    }, []);

    const capitalize = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    const handleFilterChange = (event, newValue, attribute) => {
        setSelectedFilters({ ...selectedFilters, [attribute]: newValue })
    };

    return (
        <Box sx={{
            marginTop: '20px',
            padding: '0 5%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'top'
        }}>
            <Typography pt='5px'>Filter By: </Typography>
            <Autocomplete
                multiple
                id="length"
                size='small'
                value={selectedFilters.length}
                onChange={(event, newValue) => handleFilterChange(event, newValue, 'length')}
                options={filtersValues.cigarLength}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField {...params} label="Length" />
                )}
            />

            <Autocomplete
                multiple
                id="ring"
                size='small'
                options={filtersValues.rings}
                disableCloseOnSelect
                value={selectedFilters.ring}
                onChange={(event, newValue) => handleFilterChange(event, newValue, 'ring')}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField {...params} label="Rings" />
                )}
            />

            <Autocomplete
                multiple
                id="strength"
                size='small'
                options={filtersValues.strengths}
                value={selectedFilters.strength}
                onChange={(event, newValue) => handleFilterChange(event, newValue, 'strength')}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField {...params} label="Strength" />
                )}
            />

            <Autocomplete
                multiple
                id="origin"
                size='small'
                options={uniqueAttributes.origins}
                value={selectedFilters.origin}
                onChange={(event, newValue) => handleFilterChange(event, newValue, 'origin')}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        option && <li key={key} {...optionProps} style={{ textTransform: 'capitalize' }}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField {...params} label="Origin" />
                )}
            />

            <Autocomplete
                multiple
                id="shape"
                size='small'
                options={uniqueAttributes.shapes}
                value={selectedFilters.shape}
                onChange={(event, newValue) => handleFilterChange(event, newValue, 'shape')}
                // PopperComponent={CustomPopper}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        option && <li key={key} {...optionProps} style={{ textTransform: 'capitalize' }}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField {...params} label="Shape" />
                )}
            />
        </Box>
    )
}

export default Filters