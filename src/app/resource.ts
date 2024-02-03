export const AddProductForm = [
  {
    name: 'id',
    type: 'number',
    placeholder: 'Id',
    required: true,
    defaultValue: Math.floor(Math.random() * 10000),
  },
  {
    name: 'title',
    type: 'text',
    placeholder: 'Title',
    required: true,
    defaultValue: '',
  },
  {
    name: 'price',
    type: 'number',
    placeholder: 'Price',
    required: true,
    defaultValue: '',
  },
  {
    name: 'img',
    type: 'text',
    placeholder: 'Image',
    required: true,
    defaultValue: '',
  },
  {
    name: 'description',
    type: 'text',
    placeholder: 'Description',
    required: false,
    defaultValue: '',
  },
  {
    name: 'category',
    type: 'text',
    placeholder: 'Category',
    required: false,
    defaultValue: '',
  },
];
