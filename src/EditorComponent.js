import React, { useCallback, useMemo, useState } from 'react';
import TagBox from 'devextreme-react/tag-box';
import { dummyPatients } from './dummyPatients';
import { Popup } from 'devextreme-react'
import DataGrid, { Column, Selection, FilterRow, Paging } from "devextreme-react/data-grid"
import { Button } from "devextreme-react";

const wrapper = { "class": "dx-dropdowneditor-overlay" };

  export function EditorComponent(props) {

  const [visible, setVisible] = useState(false);
  const [dataGrid, setDataGrid] = useState();

  // const onSelectionChanged = useCallback((e) => {
  //   let selectedItems = e.component.option("selectedItems");
  //   let val = [];

  //   // create an array of strings based on "names" from selectedItems option
  //   selectedItems.forEach((x) => {
  //     val.push(x.name);
  //   });

  //   // return an array of strings in setValue function
  //   props.data.setValue(val);
  // }, []);

  const onVal = useCallback((e) => {
    props.data.setValue(e.value); // notifies FilterBuilder editing API that the value was changed.
  }, []);

  const dropDownOptions = useMemo(() => {
    return {
      onShowing: (e) => {
        e.cancel = true;
        setVisible(true);
        //props.setDialupPopupVisible((pr) => !pr);
      },
      hideOnOutsideClick: false
    };
  }, []);

  function handleClick(){
    let patients = dataGrid.getSelectedRowsData();

    var names = patients.map(function(p) {
      return p['name'];
    });

    // props.setDisplaySelectedPatients(names)
    // props.setSelectedPatients(patients)
    
    setVisible(false)
    props.data.setValue(names)
  }

  function handleOnInitialized(e){
    setDataGrid(e.component);
  }

  function RenderContent(){       
    return(
        <>
            <DataGrid
                dataSource={ dummyPatients }
                keyExpr={'_id'}
                onInitialized={handleOnInitialized}


                height={'auto'}
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

            <Button text="Add" onClick={handleClick} />
        </>
    )
  }

  function handleOnHiding(){
    setVisible(false);
  }

  console.log(props.data);

  return (<>
    <TagBox
      items={dummyPatients}
      // onSelectionChanged={onSelectionChanged}
      onValueChange={onVal}
      value={props.data.value}
      dropDownOptions={dropDownOptions}

      // displayExpr={'name'}
      width="200px"
    />
    <Popup
      visible={visible}
      shading={false}
      resizeEnabled={true}
      hideOnOutsideClick={false}
      onHiding={handleOnHiding}
      contentRender={RenderContent}
      height={'auto'}
      wrapperAttr={wrapper}
    />
  </>
  );
}