import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ModifiedSheduleAddForm from './ModifiedSheduleAddForm'

const ModifiedSheduleAddDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      sx={{
        height: '70%',
        pt: '120px',
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Добавить изменение в расписание</DialogTitle>
      <DialogContent sx={{ py: '10px !important' }}>
        <ModifiedSheduleAddForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default ModifiedSheduleAddDialog
