import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Mínimo de 3 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .required("Campo obrigatório").label('Nome'),
  // cleaning_method: yup.object<Dropdown>().required().shape({
  //   id: yup.string(),
  // }),
  cleaning_date: yup.date()
    .min('1900-01-01', "A data deve ser maior que 01/01/1900")
    .required()
    .label('Data da Limpeza'),
  methods: yup.array()
    .min(1)
    .required()
    .label('Métodos de Limpeza'),
});

export default schema;
