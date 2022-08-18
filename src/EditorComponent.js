import React from 'react';
import TagBox from 'devextreme-react/tag-box';

export function EditorComponent(props){



  function onValueChanged(e) {
    props.data.setValue(e.value && e.value.length ? e.value : null);
  }


  function handleOpen(){
    const dropdown = document.querySelector('.dx-selectbox-popup-wrapper .dx-overlay-content');
    dropdown.style.display = 'none';
    props.setDialupPopupVisible(prev => !prev)
  }

  function handleonValueChanged(e){
    // console.log('handling on valueChanged')
    // console.log(e)
  }

  return (
    <TagBox
      // defaultValue={props.data.value}
      items={props.displaySelectedPatients}
      onValueChanged={onValueChanged}
      width="200px"
      onOpened={handleOpen}
      onValueChange={handleonValueChanged}
      value={props.displaySelectedPatients}
    />
  );
}