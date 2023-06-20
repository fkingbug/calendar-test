import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModifiedSheduleEditForm from './ModifiedSheduleEditForm';

const ModifiedSheduleEditDialog = ({ open, setOpen, selectedRow }) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			sx={{
				height: '70%',
				pt: '120px',
			}}
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>Редактировать изменение</DialogTitle>
			<DialogContent sx={{ py: '10px !important' }}>
				<ModifiedSheduleEditForm handleClose={handleClose} selectedRow={selectedRow} />
			</DialogContent>
		</Dialog>
	);
};

export default ModifiedSheduleEditDialog;
