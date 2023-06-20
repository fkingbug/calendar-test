import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ModifiedSheduleAddDialog from './ModifiedSheduleAddDialog';
import ModifiedSheduleEditDialog from './ModifiedSheduleEditDialog';

const ModifiedShedule = () => {
	const [openAddDialog, setOpenAddDialog] = React.useState(false);
	const [openEditDialog, setOpenEditDialog] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(null);

	const data = {
		'19.06.2023': [
			{
				group: '1',
				lesson: '1 пара на 4 пару',
				lastTeacher: 'иванов',
				newTeacher: 'пеьтров',
				audience: 54645,
			},
			{
				group: '2',
				lesson: '5 пара на 1 пару',
				lastTeacher: 'иванов123',
				newTeacher: 'пеьтров4324',
				audience: 5,
			},
			{
				group: '13',
				lesson: '1 пара на 42 пару',
				lastTeacher: 'иванов1',
				newTeacher: 'пеьтров000',
				audience: 54644565,
			},
		],
		'29.06.2023': [
			{
				group: '1',
				lesson: '1 пара на 4 пару',
				lastTeacher: 'иванов',
				newTeacher: 'пеьтров',
				audience: 54645,
			},
			{
				group: '13',
				lesson: '1 пара на 42 пару',
				lastTeacher: 'иванов1',
				newTeacher: 'пеьтров000',
				audience: 54644565,
			},
		],
		'09.06.2023': [
			{
				group: '1',
				lesson: '1 пара на 4 пару',
				lastTeacher: 'иванов',
				newTeacher: 'пеьтров',
				audience: 54645,
			},
		],
	};

	const handleClickOpen = () => {
		setOpenAddDialog(true);
	};

	const handleDelete = (event, date) => {
		event.stopPropagation();
		console.log('удаление по дате', date);
	};

	const handleDoubleClickRow = row => {
		setOpenEditDialog(true);
		setSelectedRow(row);
	};

	return (
		<>
			<div>
				<Button onClick={handleClickOpen} sx={{ width: '240px' }} variant='contained'>
					Добавить изменение
				</Button>
				<h2 className='table-title'>Измененное расписание</h2>
				{Object.keys(data).map((el, index) => (
					<Accordion key={index}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>
								<span
									onClick={event => handleDelete(event, el)}
									style={{ paddingRight: '20px' }}
								>
									&#10006;
								</span>
								{el}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow style={{ backgroundColor: '#cdcdcd' }}>
											<TableCell align='center'>Группа</TableCell>
											<TableCell align='center'>Пара</TableCell>
											<TableCell align='center'>Кто заменяет</TableCell>
											<TableCell align='center'>Кого заменяют</TableCell>
											<TableCell align='center'>Аудитория</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data[el]?.map((row, index) => (
											<TableRow
												key={index}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												<TableCell
													onDoubleClick={() => handleDoubleClickRow(row)}
													align='center'
												>
													{row.group}
												</TableCell>
												<TableCell
													onDoubleClick={() => handleDoubleClickRow(row)}
													align='center'
												>
													{row.lesson}
												</TableCell>
												<TableCell
													onDoubleClick={() => handleDoubleClickRow(row)}
													align='center'
												>
													{row.lastTeacher}
												</TableCell>
												<TableCell
													onDoubleClick={() => handleDoubleClickRow(row)}
													align='center'
												>
													{row.newTeacher}
												</TableCell>
												<TableCell
													onDoubleClick={() => handleDoubleClickRow(row)}
													align='center'
												>
													{row.audience}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
			<ModifiedSheduleAddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
			<ModifiedSheduleEditDialog
				open={openEditDialog}
				setOpen={setOpenEditDialog}
				selectedRow={selectedRow}
			/>
		</>
	);
};

export default ModifiedShedule;
