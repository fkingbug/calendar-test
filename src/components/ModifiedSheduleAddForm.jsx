import Button from '@mui/material/Button';
import ruLocale from 'date-fns/locale/ru';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const ModifiedSheduleAddForm = ({ handleClose }) => {
	const { control, register, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: {
			date: new Date(),
		},
	});

	const onSubmit = data => {
		console.log({ ...data, date: format(data.date, 'dd.MM.yyyy') });
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
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
				<Controller
					control={control}
					name={'date'}
					rules={{
						required: {
							message: 'Это поле обязательное',
							value: true,
						},
					}}
					render={({ field }) => (
						<DatePicker
							{...field}
							label='Выберите дату замены'
							minDate={new Date()}
							maxDate={new Date('01-01-2070')}
						/>
					)}
				/>
			</LocalizationProvider>
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

export default ModifiedSheduleAddForm;
