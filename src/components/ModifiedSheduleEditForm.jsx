import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const ModifiedSheduleEditForm = ({ handleClose, selectedRow }) => {
	const { register, handleSubmit } = useForm({
		mode: 'onChange',
		values: selectedRow,
	});

	const onSubmit = data => {
		console.log('отправить на бек', data);
		handleClose();
	};

	const fields = [
		{ label: 'Группа', key: 'group' },
		{ label: 'Пара', key: 'lesson' },
		{ label: 'Кого заменяют', key: 'lastTeacher' },
		{ label: 'Кто заменяет', key: 'newTeacher' },
		{ label: 'Аудитория', key: 'audience' },
	];

	return (
		<>
			{fields.map((el, index) => (
				<TextField
					key={index}
					sx={{ my: 1.5 }}
					{...register(el.key)}
					fullWidth
					label={el.label}
					variant='filled'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			))}
			<Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
		</>
	);
};

export default ModifiedSheduleEditForm;
