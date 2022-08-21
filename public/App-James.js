// igonre this. That was used for our initial test, we probably won't use it.


import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.light.css";
import "devextreme/dist/css/dx.material.blue.light.css";
import { useState, useEffect } from "react";
import List, { ItemDragging } from "devextreme-react/list";
import Button from "devextreme-react/button";
import Popover from "devextreme-react/popover";
import Popup, { ToolbarItem } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import NumberBox from "devextreme-react/number-box";
import Lookup from "devextreme-react/lookup";
import "./App.css";

function App() {
  const [isFiltersPopoverVisible, setIsFiltersPopoverVisible] = useState(false);
  const [isFiltersSelectPopupVisible, setIsFiltersSelectPopupVisible] =
    useState(false);
  const [selectedPopupFilter, setSelectedPopupFilter] = useState(null);
  const [selectedFilterValue, setSelectedFilterValue] = useState(null);
  const [filtersPopoverList, setfiltersPopoverList] = useState([
    {
      id: 1,
      typeId: 1,
      description: "Custom Filter",
    },
    {
      id: 2,
      typeId: 4,
      description: "Company",
    },
    {
      id: 3,
      typeId: 3,
      description: "Date of Apppointment",
    },
    {
      id: 4,
      typeId: 2,
      description: "Duration (Planned) (Minutes)",
    },
    {
      id: 5,
      typeId: 4,
      description: "Room",
    },
  ]);

  const addFilterButtonClick = () => {
    let id = filtersList ? filtersList.length + 1 : 0;
    setFiltersList((prevArray) => [
      ...prevArray,
      {
        id: id,
        typeId: selectedPopupFilter.typeId,
        description:
          selectedPopupFilter.description + " = " + selectedFilterValue,
      },
      {
        id: id + 1,
        typeId: 98,
        description: "AND",
      },
    ]);
    setIsFiltersSelectPopupVisible(false);
  };

  // type 1 = textbox
  // type 2 = numeric
  // type 3 = date
  // type 4 = lookup
  // type 98 = AND
  // type 99 = OR

  const [filtersList, setFiltersList] = useState([]);
  const sendButtonOptions = {
    icon: "add",
    text: "Add",
    onClick: addFilterButtonClick,
  };

  useEffect(() => {
    // setIsFiltersPopoverVisible(false);
  });

  const onAddButtonClick = () => {
    setIsFiltersPopoverVisible(true);
  };

  const onFilterPopoverListItemClick = (e) => {
    setSelectedPopupFilter(e.itemData);
    setIsFiltersSelectPopupVisible(true);
    setIsFiltersPopoverVisible(false);
  };

  const hideFiltersPopup = () => {
    setIsFiltersPopoverVisible(false);
  };
  const hideFiltersSelectPopup = () => {
    setIsFiltersSelectPopupVisible(false);
  };

  function filterPickerPopupContentsRender() {
    if (selectedPopupFilter) {
      switch (selectedPopupFilter.typeId) {
        case 1:
          return (
            <TextBox
              onValueChanged={(e) => {
                setSelectedFilterValue(e.value);
              }}
            ></TextBox>
          );
        case 2:
          return (
            <NumberBox
              onValueChanged={(e) => {
                setSelectedFilterValue(e.value);
              }}
            ></NumberBox>
          );
        case 3:
          return (
            <DateBox
              onValueChanged={(e) => {
                setSelectedFilterValue(e.value.toLocaleDateString("en-UK"));
              }}
            ></DateBox>
          );
        case 4:
          return (
            <Lookup
              items={["Room 1", "Room 2", "Room 3", "Room 4"]}
              onValueChanged={(e) => {
                setSelectedFilterValue(e.value);
              }}
            ></Lookup>
          );
        default:
          return <h3>No matching filter</h3>;
      }
    }
  }

  function filtersListRender(e) {
    return (
      <>
        <label className="filter-description">{e.description}</label>
        {!(e.typeId === 98 || e.typeId === 99) && (
          <Button className="filter-delete-button" icon="close"></Button>
        )}
      </>
    );
  }

  function onfilterListItemClick(e) {
    if (e.itemData.typeId === 98 || e.itemData.typeId === 99) {
      // Change all AND's to OR's or vice versa
      let newOrArr,
        index = filtersList.indexOf(e.itemData);

      switch (e.itemData.typeId) {
        case 98:
          newOrArr = [...filtersList];
          newOrArr.splice(index, 1, {
            typeId: 99,
            description: "OR",
          });
          setFiltersList(newOrArr);
          break;
        case 99:
          newOrArr = [...filtersList];
          newOrArr.splice(index, 1, {
            typeId: 98,
            description: "AND",
          });
          setFiltersList(newOrArr);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className="App-header">
      <section className="list-section">
        <Button
          id="addFilterButton"
          className="add-button"
          onClick={onAddButtonClick}
          text="Add"
        ></Button>
        <List
          className="expression--editor-list"
          dataSource={filtersList}
          displayExpr="description"
          keyExpr="id"
          repaintChangesOnly={true}
          noDataText="No filters"
          itemRender={filtersListRender}
          onItemClick={onfilterListItemClick}
          height="300px"
          width="500px"
        >
          {/* <ItemDragging allowReordering={true}></ItemDragging> */}
        </List>
        <Popover
          visible={isFiltersPopoverVisible}
          target="#addFilterButton"
          width={300}
          onHiding={hideFiltersPopup}
        >
          <List
            dataSource={filtersPopoverList}
            displayExpr="description"
            keyExpr="id"
            repaintChangesOnly={true}
            onItemClick={onFilterPopoverListItemClick}
          ></List>
        </Popover>
      </section>
      <Popup
        visible={isFiltersSelectPopupVisible}
        width={400}
        height={400}
        onHiding={hideFiltersSelectPopup}
        showCloseButton={true}
        title={selectedPopupFilter && selectedPopupFilter.description}
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={sendButtonOptions}
        />
        <div>{filterPickerPopupContentsRender()}</div>
      </Popup>
    </div>
  );
}

export default App;
