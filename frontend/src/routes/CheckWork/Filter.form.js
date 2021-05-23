import * as yup from 'yup';
import { getDate } from '../../utils/helper';

export const defaultValues = {
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  users: [],
};

export const validationSchema = yup.object({
  startDate: yup.date(),
  endDate: yup.date(),
  users: yup.array(),
});