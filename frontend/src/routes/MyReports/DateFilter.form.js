import * as yup from 'yup';
import { getDate } from '../../utils/helper';

export const defaultValues = {
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
};

export const validationSchema = yup.object({
  startDate: yup.date().required('required_field'),
  endDate: yup.date().required('required_field'),
});