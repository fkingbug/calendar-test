import './css/App.css'
import React from 'react'
import AuthPage from './pages/AuthPage'
import NotFound from './pages/NotFoundPage'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import TryForConfirmPage from './pages/TryForConfirmPage'
import ConfirmPage from './pages/ConfirmPage'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DialogForm from './components/DialogForm'
import SelectGroup from './components/SelectGroup'
import ModifiedShedule from './components/ModifiedShedule'
import { Box, Typography } from '@mui/material'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProfileButton />} />
        <Route path='/modified-schedule' element={<ModifiedShedule />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/registration/confirm' element={<ConfirmPage />} />
        {/*<Route path="/tryforconfirm/:uuid" element={<TryForConfirmPage />} />*/}
        <Route path='/tryforconfirm' element={<TryForConfirmPage />} />
        <Route path='/recovery' element={<PasswordRecoveryPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

const data = {
  0: [
    {},
    { lesson: 'ОБЖ', teacher: 'Иванов' },
    { lesson: 'изо', teacher: 'Иванов1' },
    { lesson: 'бжд', teacher: 'Иванов2' },
    { lesson: 'физика', teacher: 'Иванов3' },
    { lesson: 'матан', teacher: 'Иванов4' },
  ],
  1: [
    {},
    { lesson: 'ОБЖ2', teacher: 'Иванов' },
    {},
    { lesson: 'бжд2', teacher: 'Иванов2' },
    { lesson: 'физика2', teacher: 'Иванов3' },
    { lesson: 'матан2', teacher: 'Иванов4' },
    {},
    {},
    { lesson: 'матан2', teacher: 'Иванов4' },
  ],
  2: [
    {},
    { lesson: 'ОБЖ3', teacher: 'Иванов' },
    { lesson: 'изо3', teacher: 'Иванов1' },
    {},
    { lesson: 'физика3', teacher: 'Иванов3' },
    { lesson: 'матан3', teacher: 'Иванов4' },
  ],
  3: [
    {},
    { lesson: 'ОБЖ4', teacher: 'Иванов' },
    { lesson: 'изо4', teacher: 'Иванов1' },
    { lesson: 'бжд4', teacher: 'Иванов2' },
    {},
    { lesson: 'матан4', teacher: 'Иванов4' },
    { lesson: 'матан4', teacher: 'Иванов4' },
    { lesson: 'матан4', teacher: 'Иванов4' },
  ],
  4: [
    { lesson: 'ОБЖ5', teacher: 'Иванов' },
    { lesson: 'изо5', teacher: 'Иванов1' },
    { lesson: 'бжд5', teacher: 'Иванов2' },
    { lesson: 'физика5', teacher: 'Иванов3' },
    {},
    {},
    {},
    { lesson: 'физика5', teacher: 'Иванов3' },
  ],
}

const checkMaxLength = rows => {
  let maxLength = 0
  Object.values(rows).forEach(el => {
    if (el?.length > maxLength) {
      maxLength = el.length
    }
  })
  return maxLength
}

const createNewObj = rows => {
  const maxLength = checkMaxLength(rows)
  const newArr = {}
  for (let index = 0; index < maxLength - 1; index++) {
    newArr[index] = []
  }
  Object.values(rows).forEach(el => {
    if (maxLength > el.length) {
      for (let index = 0; index < maxLength - el.length; index++) {
        el.push({})
      }
    }
    el.forEach((para, index) => {
      if (index in newArr) {
        newArr[index].push(para)
      } else {
        newArr[index] = []
        newArr[index].push(para)
      }
    })
  })
  return newArr
}

const ProfileButton = () => {
  const [selectedRow, setSelectedRow] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [day, setDay] = React.useState(null)
  const [group, setGroup] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRow(null)
  }

  const handleDoubleClickRow = index => {
    handleClickOpen()
    setSelectedRow(data[index])
    setDay(index)
  }

  return (
    <>
      <div className='header'>
        {group && <Box pr='50px'>Группа: {group}</Box>}
        <SelectGroup group={group} setGroup={setGroup} />
        <div className='profile-button'>
          <Link to='/'>Основное расписание</Link>
          <Link to='/modified-schedule'>Измененное расписание</Link>
          <Link to='/auth' className='profile-button-item'>
            Профиль
          </Link>
        </div>
      </div>
      {group ? (
        <div className='main-table'>
          <h2 className='table-title'>Расписание</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow style={{ backgroundColor: '#cdcdcd' }}>
                  <TableCell width={60}></TableCell>
                  <TableCell align='center'>Понедельник</TableCell>
                  <TableCell align='center'>Вторник</TableCell>
                  <TableCell align='center'>Среда</TableCell>
                  <TableCell align='center'>Четверг</TableCell>
                  <TableCell align='center'>Пятница</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(createNewObj(data))?.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {index + 1}-я пара
                    </TableCell>
                    <TableCell onDoubleClick={() => handleDoubleClickRow(0)} align='center'>
                      {row[0]?.lesson}
                      <br />
                      {row[0]?.teacher}
                    </TableCell>
                    <TableCell onDoubleClick={() => handleDoubleClickRow(1)} align='center'>
                      {row[1]?.lesson}
                      <br />
                      {row[1]?.teacher}
                    </TableCell>
                    <TableCell onDoubleClick={() => handleDoubleClickRow(2)} align='center'>
                      {row[2]?.lesson}
                      <br />
                      {row[2]?.teacher}
                    </TableCell>
                    <TableCell onDoubleClick={() => handleDoubleClickRow(3)} align='center'>
                      {row[3]?.lesson}
                      <br />
                      {row[3]?.teacher}
                    </TableCell>
                    <TableCell onDoubleClick={() => handleDoubleClickRow(4)} align='center'>
                      {row[4]?.lesson}
                      <br />
                      {row[4]?.teacher}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Box
          height={'90vh'}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography>Выберите группу</Typography>
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        flexGrow='1'
      >
        <DialogForm day={day} data={selectedRow} open={open} close={handleClose} />
      </Box>
    </>
  )
}

export default App
