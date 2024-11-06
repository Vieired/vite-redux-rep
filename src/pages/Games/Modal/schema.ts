import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters').required().label('Name'),
  // city: yup.object<Dropdown>().required().shape({
  //   id: yup.string(),
  // }),
  cleaning_date: yup.date().min('1900-01-01').required().label('Start Date'),
});

export default schema;
