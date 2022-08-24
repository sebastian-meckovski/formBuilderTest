// import 'devextreme/dist/css/dx.light.css';
// import './styles.scss'
// import React, { useState } from 'react';
// import { Popup } from 'devextreme-react'
// import { dummyPatients } from './dummyPatients.js';
// import  DataGrid, {Column, Selection, FilterRow, Paging} from "devextreme-react/data-grid"
// import { Button } from "devextreme-react";


// export default function PatientSearchPopup(props){
//     const [dataGrid, setDataGrid] = useState();

//     function handleOnHiding(){
//       props.setDialupPopupVisible(false)
//     }
  
//     function handleClick(){
//         let patients = dataGrid.getSelectedRowsData();

//         var names = patients.map(function(p) {
//           return p['name'];
//         });

//         props.setDisplaySelectedPatients(names)
//         props.setSelectedPatients(patients)
//         props.setDialupPopupVisible(false)
//     }

//     function handleOnInitialized(e){
//         setDataGrid(e.component);
//     }

//     function RenderContent(){       
//       return(
//           <>
//               <DataGrid
//                   dataSource={ dummyPatients }
//                   keyExpr={'_id'}
//                   onInitialized={handleOnInitialized}
//               >
//                   <Selection mode={'multiple'} showCheckBoxesMode={'always'}/>
//                   <Paging defaultPageSize={15} />
//                   <FilterRow visible={true} />
  
//                   <Column dataField="name" />
//                   <Column dataField="gender" />
//                   <Column dataField="company" />
//                   <Column dataField="phone" />
//                   <Column dataField="email" />
//                   <Column dataField="age" />
  
//               </DataGrid>

//               <Button text="Add" onClick={handleClick}/>
//           </>
//       )
//     }
  
//     return(
//       <Popup
//         visible={props.dialupPopupVisible}
//         hideOnOutsideClick={true}
//         onHiding={handleOnHiding}
//         contentRender={RenderContent}
//         height={'auto'}
//       />
//     )
//   }