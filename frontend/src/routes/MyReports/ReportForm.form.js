import * as yup from 'yup';

export const validationSchema = yup.object({
  projectId: yup.string().required('required_field'),
  featureId: yup.string().required('required_field'),
  taskId: yup.string().required('required_field'),
  hours: yup.number().required('required_field'),
  factorId: yup.string().required('required_field'),
  locationId: yup.string().required('required_field'),
});