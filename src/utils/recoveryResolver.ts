import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const recoverySchema = z
  .object({
    password: z
      .string()
      .min(1, 'Введите пароль')
      .min(3, 'Минимальная длина пароля - 3 символов')
      .max(36, 'Максимальная длина пароля - 36 символов'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли должны сопадать',
    path: ['confirmPassword'],
  })

export const recoveryResolver = zodResolver(recoverySchema)
