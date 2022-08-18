import React, { createRef, useRef } from "react"
import  DataGrid, {Column, Selection, FilterRow, Paging} from "devextreme-react/data-grid"
import { dummyPatients } from './dummyPatients.js';
import { Button } from "devextreme-react";



export default function RenderContent(props){

    let dataGrid;

    function handleClick(){
        console.log(dataGrid.getSelectedRowsData())
    }

    function handleOnInitialized(e){
        dataGrid = e.component;
    }
    
    return(
        <>
            <DataGrid
                dataSource={ dummyPatients }
                keyExpr={'_id'}
                onInitialized={handleOnInitialized}
            >
                <Selection mode={'multiple'} showCheckBoxesMode={'always'}/>
                <Paging defaultPageSize={15} />
                <FilterRow visible={true} />

                <Column dataField="name" />
                <Column dataField="gender" />
                <Column dataField="company" />
                <Column dataField="phone" />
                <Column dataField="email" />
                <Column dataField="age" />

            </DataGrid>

            <Button text="Add" onClick={handleClick}/>
        </>
    )
}