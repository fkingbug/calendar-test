import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const authSchema = z.object({
  login: z.string().email('Введите верный формат почты').min(1, 'Введите почту'),
  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(3, 'Минимальная длина пароля - 3 символов')
    .max(36, 'Максимальная длина пароля - 36 символов'),
})

export const authResolver = zodResolver(authSchema)
