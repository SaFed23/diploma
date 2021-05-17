import * as yup from 'yup';

export const defaultValues = {
  username: '',
  password: ''
}

export const validationSchema = yup.object({
  username: yup
    .string()
    .required('required_field')
    .min(4, 'login_cannot_be_less_then_4')
    .max(36, 'login_cannot_be_more_then_36'),
  password: yup
    .string()
    .required('required_field')
    .min(4, 'password_cannot_be_less_then_8')
    .max(36, 'password_cannot_be_more_then_36'),
});