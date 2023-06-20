import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const TextFormField = ({ element, number, label, val }) => {
	const { register, setValue } = useFormContext();

	useEffect(() => {
		setValue(number + '_' + val, element[val] || '');
	}, [element, number, setValue, val]);

	return (
		<TextField
			sx={{ mb: 1.5 }}
			{...register(number + '_' + val)}
			fullWidth
			label={label}
			variant='filled'
			InputLabelProps={{
				shrink: true,
			}}
		/>
	);
};

export default TextFormField;
