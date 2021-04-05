import * as yup from 'yup';

export const defaultValues = {
  username: '',
  password: ''
}

export const validationSchema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле')
    .min(4, 'Логин не может быть меньше 4 символов')
    .max(36, 'Логин не может быть больше 36 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(4, 'Пароль не может быть меньше 8 символов')
    .max(36, 'Пароль не может быть больше 36 символов'),
});