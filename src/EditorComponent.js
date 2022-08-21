import React, { useCallback, useMemo } from 'react';
import TagBox from 'devextreme-react/tag-box';
import { dummyPatients } from './dummyPatients';

export function EditorComponent(props){ 

  const onSelectionChanged = useCallback((e) => {
    let selectedItems = e.component.option("selectedItems");
    let val = [];
  
    // create an array of strings based on "names" from selectedItems option
    selectedItems.forEach((x) => {
      val.push(x.name);
    });

    // return an array of strings in setValue function
    props.data.setValue(val);
  }, []);

  const dropDownOptions = useMemo(() => {
    return {
      onShowing: (e) => {
        e.cancel = true;
        props.setDialupPopupVisible((pr) => !pr);
      }
    };
  }, []);

  return (
    <TagBox
      items={dummyPatients}
      onSelectionChanged={onSelectionChanged}
      value={props.selectedPatients}
      dropDownOptions={dropDownOptions}


      displayExpr={'name'}
      width="200px"
    />
  );
}