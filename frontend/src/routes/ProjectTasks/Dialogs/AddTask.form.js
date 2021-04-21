import * as yup from 'yup';

export const defaultValues = {
  title: '',
  description: ''
}

export const validationSchema = yup.object({
  title: yup.string().required('Обязательное поле'),
  description: yup.string(),
});