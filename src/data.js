export const filter = [
  ['Category', 'anyof', ['Automation', 'Monitors']],
  'or',
  [
    ['Category', '=', 'Televisions'],
    'and',
    ['Price', 'between', [2000, 4000]],
  ],
];
export const categories = [
  'Video Players',
  'Televisions',
  'Monitors',
  'Projectors',
  'Automation',
  'Automation1',
  'Automation2',
  'Automation3',
  'Automation5',
];
export const groupOperations = ['and', 'or'];

export const fields = [{
  dataField: 'Name',
}, {
  dataField: 'Price',
  dataType: 'number',
  format: 'currency',
}, {
  dataField: 'Current_Inventory',
  dataType: 'number',
  caption: 'Inventory',
}, {
}, {
  dataField: 'TextTest',
  dataType: 'string',
  caption: 'TextTest',
}, {
}, {
  dataField: 'DateTst',
  dataType: 'date',
  caption: 'DateTEst',
}, {
  dataField: 'Patients',
  filterOperations: ['=', 'anyof'],
  lookup: {
    dataSource: categories,
  },
  caption: 'Patients'
}];
