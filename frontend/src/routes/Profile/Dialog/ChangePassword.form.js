import * as yup from 'yup';

export const defaultValues = {
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
}

export const validationSchema = yup.object({
  oldPassword: yup.string().required('required_field'),
  newPassword: yup.string().required('required_field'),
  repeatNewPassword: yup.string().required('required_field'),
});