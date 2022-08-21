import 'devextreme/dist/css/dx.light.css';
import './styles.scss'
import React, { useState } from 'react';
import FilterBuilder, { CustomOperation } from 'devextreme-react/filter-builder';
import { fields, groupOperations } from './data.js';
import { formatValue } from './helpers.js';
import { EditorComponent } from './EditorComponent.js';
import PatientSearchPopup from './patientSearchPopup';


export default function App() {

    const [selectedPatients, setSelectedPatients] = useState();
    const [displaySelectedPatients, setDisplaySelectedPatients] = useState();
    const [textValue, setTextValue] = useState({
      filterText: '',
      dataSourceText: ''
    });

    const [dialupPopupVisible, setDialupPopupVisible] = useState(false);

    function updateTexts(e) {
      setTextValue({
        filterText: formatValue(e.component.option('value')),
        dataSourceText: formatValue(e.component.getFilterExpression()),
      });
    }
    
    function onValueChanged(e) {
      setTextValue({ value: e.value });
      updateTexts(e);
    }

    function renderEditor(props) {
        return(
            <EditorComponent
                setDialupPopupVisible={setDialupPopupVisible}
                selectedPatients={selectedPatients}
                data={props}
                displaySelectedPatients={displaySelectedPatients}
            />
        )
    }

    return (
      <div>
        <FilterBuilder
          fields={fields}
          onInitialized={updateTexts}
          groupOperations={['and', 'or']}
          onValueChanged={onValueChanged}
        >
          <CustomOperation
            name="anyof"
            caption="Is any of"
            icon="check"
            calculateFilterExpression={calculateFilterExpression}
            editorRender={renderEditor}
          />
          </FilterBuilder>

        <PatientSearchPopup
          visible={dialupPopupVisible}
          setDialupPopupVisible={setDialupPopupVisible}
          dialupPopupVisible={dialupPopupVisible}
          selectedPatients={selectedPatients}
          setSelectedPatients={setSelectedPatients}
          setDisplaySelectedPatients={setDisplaySelectedPatients}
        />
        
        <div className="results">
          <div>
            <b>filterText</b>
            <pre>{textValue.filterText}</pre>
          </div>
          <div>
            <b>DataSource&apos;s filter expression</b>
            <pre>{textValue.dataSourceText}</pre>
          </div>
        </div>

      </div>
    );
}

function calculateFilterExpression(filterValue, field) {
  return filterValue && filterValue.length
    && Array.prototype.concat.apply([], filterValue.map((value) => [[field.dataField, '=', value], 'or'])).slice(0, -1);
}

