import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectGroup = ({ group, setGroup }) => {
	const handleChange = event => {
		setGroup(event.target.value);
	};

	const groups = [{ label: 'CT-50', key: 'sdfs;' }];

	return (
		<FormControl
			sx={{
				width: '300px',
			}}
		>
			<InputLabel>Группа</InputLabel>
			<Select value={group} label='Группа' onChange={handleChange}>
				<MenuItem value={1}>группа 1</MenuItem>
				<MenuItem value={2}>группа 2</MenuItem>
				<MenuItem value={3}>группа 3</MenuItem>
			</Select>
		</FormControl>
	);
};
export default SelectGroup;
