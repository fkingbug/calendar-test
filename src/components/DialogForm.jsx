import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextFormField from './TextFormField'
import { FormProvider, useForm } from 'react-hook-form'
import { DAYS } from '../constants/days'

const DialogForm = ({ day, data, open, close }) => {
  const methods = useForm({
    mode: 'onChange',
  })

  const onSubmit = data => {
    const newArr = []
    for (const key in data) {
      const obj = {
        [key]: data[key],
      }
      newArr.push(obj)
    }

    const newSet = new Set()
    newArr.forEach((el, index) => {
      const obj = {}
      newArr.forEach(elNested => {
        if (Object.keys(el)[0].includes(index)) {
          obj[Object.entries(el)[0][0]] = Object.entries(el)[0][1]
        }
        if (Object.keys(elNested)[0].includes(index)) {
          obj[Object.entries(elNested)[0][0]] = Object.entries(elNested)[0][1]
        }
        if (Object.keys(obj).length > 1) {
          newSet.add(obj)
        }
      })
    })
    const sendData = []

    ;[...newSet].forEach(el => {
      let idx = 0
      for (const key in el) {
        const obj = {
          [Object.entries(el)[0][0].split('_')[1]]: Object.entries(el)[0][1],
          [Object.entries(el)[1][0].split('_')[1]]: Object.entries(el)[1][1],
        }
        if (idx % 2 === 0) {
          sendData.push(obj)
        }
        idx++
      }
    })
    console.log(sendData, day)
    handleClose()
  }

  const handleClose = () => {
    close()
    methods.reset()
  }

  return (
    <>
      <Dialog
        sx={{
          height: '70%',
          pt: '120px',
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Редактировать расписание на {DAYS[day]}</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            {data?.map((el, index) => (
              <div key={index}>
                <div>{index + 1}-я пара</div>
                <TextFormField
                  element={el}
                  number={index}
                  label={'Преподаватель'}
                  val={'teacher'}
                />
                <TextFormField element={el} number={index} label={'Предмет'} val={'lesson'} />
              </div>
            ))}
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={methods.handleSubmit(onSubmit)}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogForm
