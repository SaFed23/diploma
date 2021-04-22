import * as yup from 'yup';

export const defaultValues = {
  title: '',
  description: '',
  assign: false,
}

export const validationSchema = yup.object({
  title: yup.string().required('Обязательное поле'),
  description: yup.string(),
  assign: yup.bool(),
});