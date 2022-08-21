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
  dataField: 'DateTest',
  dataType: 'date',
  caption: 'DateTest',
}, {
  dataField: 'Patients',
  filterOperations: ['=', 'anyof'],
  caption: 'Patients'
}];
