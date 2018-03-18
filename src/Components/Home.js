import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Menu, Segment, Button, Loader } from "semantic-ui-react";

import AddGroup from "./AddGroup";
import Edit from "./Edit";
import { collections } from './../constants/edition';
import { db, auth } from './../firebase/firebase';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

var _ = require('lodash');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "addgroup",
      config: {},
      data: [],
      search: "",
      errorMessage: null,
      hiddenNeg: true,
      hiddenPos: true,
      currentlyAdding: [],
      selectedGroup: null,
      currentlyFilteredBy: "",
      purged: []
    };
  }

  componentWillMount() {
    const uid = auth.currentUser.uid;
    for (const key in collections) {
      this.setState({ [key]: [] })
      db.collection("users").doc(uid).collection(key).get()
        .then(snapshot => {
          this.addSnapshotToState(snapshot, key)
        })
        .catch(err => {
          console.log('Error getting documents', err)
        });
    }
  }

  addSnapshotToState = (snapshot, collname) => {
    let container = []
    let newdoc = {}
    snapshot.forEach(doc => {
      newdoc = doc.data();
      newdoc.id = doc.id;
      newdoc.edit = "truc";
      container.push(newdoc);
    });
    this.setState({ [collname]: container })
  }

  handleItemClick = (e, { name }) => {
    if (name === "Élèves") {
      return this.setState({ activeItem: "addgroup" })
    } else if (name === "Mes infos") {
      return this.setState({ activeItem: "infos" })
    } else {
      for (const key in collections) {
        if (collections[key].title === name) {
          const config = collections[key];
          const collname = collections[key].collname;
          const array = this.state[collname];
          this.setState({
            config,
            data: array,
            activeItem: collname
          })
        }
      }
    }
  };

  // Add, edit and delete items

  handleDismiss = () => {
    this.setState({ visible: false })
    setTimeout(() => {
      this.setState({ visible: true })
    }, 2000)
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(1000));
  }

  addNew = () => {
    let { data, currentlyAdding } = this.state;
    const random = this.getRandomInt()
    const id = `aaanew-${data.length + 1}-${random}`;
    const newDoc = { id }
    currentlyAdding.push(newDoc)
    data = []
    data.push(newDoc)
    this.setState({ currentlyAdding, data, currentlyFilteredBy: "" })
  }

  deleteMe = (rowIndex, rowId) => {
    const { data, currentlyAdding, config } = this.state;
    const activeColl = config.collname;
    let store = this.state.data[activeColl];
    var purged = _.remove(data, (item) => item.id === rowId);
    var purgedStore = _.remove(store, (item) => item.id === rowId);
    this.setState({ purged })
    if (currentlyAdding.length === 0) {
      // delete op
      this.fbRemove(rowId)
      return
    } else {
      // cancel op
      this.setState({ currentlyAdding: [] })
      this.refreshStateWithStore()
    }
  }

  handleEdit = (data, cellEdit) => {
    const { rowId, dataField, newValue } = cellEdit;
    console.log("arrived on handleEdit", rowId)
    const newData = data.map((row) => {
      if (row.id === rowId) {
        const newRow = { ...row };
        newRow[dataField] = newValue;
        console.log("handlechange with", newRow)
        this.fbEdit(rowId, newRow)
        return newRow;
      }
      return row;
    });
    if (rowId.length === 20) {
      this.updateStateAndStore(newData)
    } else {
      this.setState({ data: newData })
    }
  }

  // Handle data and store

  updateStateAndStore(newData) {
    // Rebuild state and store with a brand new array
    const { config } = this.state;
    const activeColl = config.collname;
    this.setState(() => ({
      data: newData,
      [activeColl]: newData,
      errorMessage: null
    }));
  }

  refreshStateWithStore = (newValue) => {
    // May or may not add a value to store and take it to rebuild the state
    const activeColl = this.state.config.collname;
    let array = this.state[activeColl]
    if (newValue) { array.push(newValue) }
    this.setState({ data: array })
  }

  // Firebase ops

  fbAdd = () => {
    // No async because we keep the possibility of batch add
    const uid = auth.currentUser.uid;
    const { config, currentlyAdding, data } = this.state;
    const activeColl = config.collname;
    currentlyAdding.forEach(newRow => {
      let newValue = data.find(row => row.id === newRow.id)
      db.collection("users").doc(uid).collection(activeColl).add(newValue)
        .then(ref => {
          console.log("Élément ajouté !", ref);
          newValue.id = ref.id
          this.refreshStateWithStore(newValue)
        })
    })
    this.setState({ currentlyAdding: [] })
  }

  async fbEdit(rowId, newValue) {
    const uid = auth.currentUser.uid;
    const activeColl = this.state.config.collname;
    if (rowId.length === 20) {
      await db.collection("users").doc(uid).collection(activeColl).doc(rowId).set(newValue)
        .then(ref => {
          console.log("Élément modifié !", rowId, newValue);
        });
    } else {
      console.log("rejecting", newValue)
      return
    }
  }

  async fbRemove(rowId) {
    const uid = auth.currentUser.uid;
    const activeColl = this.state.config.collname;
    await db.collection("users").doc(uid).collection(activeColl).doc(rowId).delete()
      .then(ref => {
        console.log("Élément supprimé !", rowId);
      });
  }

  // Sort and filter functions

  handleSort = (data, sortField, sortOrder) => {
    let result;
    if (sortOrder === 'asc') {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return 1;
        } else if (b[sortField] > a[sortField]) {
          return -1;
        }
        return 0;
      });
    } else {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return -1;
        } else if (b[sortField] > a[sortField]) {
          return 1;
        }
        return 0;
      });
    }
    this.updateStateAndStore(result)
  }

  filterWithBar = (filterKey) => {
    if (filterKey === "reset") {
      this.setState({ selectedGroup: null, currentlyFilteredBy: "" })
      this.refreshStateWithStore()
      console.log("tous")
    } else {
      const { config } = this.state;
      const activeColl = config.collname;
      const field = config.filterBar;
      const array = this.state[activeColl];
      const filtered = array.filter(item => item[field] === filterKey)
      if (filterKey === "Autre") {
        const filtered = array.filter(item => !item[field])
        return this.setState({ selectedGroup: filtered, data: filtered, currentlyFilteredBy: filterKey })
      }
      return this.setState({ selectedGroup: filtered, data: filtered, currentlyFilteredBy: filterKey })
    }
  }

  setBackDataForSearch = () => {
    const { config, selectedGroup } = this.state;
    const activeColl = config.collname;
    if (selectedGroup) {
      return selectedGroup
    } else if (selectedGroup === null) {
      return this.state[activeColl]
    }
  }

  handleSearch = (props) => {
    const { filters } = props
    const backData = this.setBackDataForSearch();
    // setTimeout(() => {
    const result = backData.filter((row) => {
      let valid = true;
      for (const dataField in filters) {
        const { filterVal, filterType, comparator } = filters[dataField];
        if (filterType === 'TEXT') {
          if (comparator === "LIKE") {
            valid = row[dataField].toString().indexOf(filterVal) > -1;
          } else {
            valid = row[dataField] === filterVal;
          }
        }
        if (!valid) break;
      }
      return valid;
    });
    this.setState(() => ({
      data: result
    }));
    // }, 500);
  }

  handleTableChange = (type, { ...props }) => {
    switch (type) {
      case "sort":
        return this.handleSort(props.data, props.sortField, props.sortOrder)
      case "cellEdit":
        return this.handleEdit(props.data, props.cellEdit)
      case "filter":
        return this.handleSearch(props)
      default:
        return
    }
  }

  getValuesForFilterBar = () => {
    const { config } = this.state;
    const collection = config.collname;
    if (config.filterBar) {
      const array = this.state[collection];
      const field = config.filterBar;
      const flattenToField = _.map(array, field);
      return _.uniq(flattenToField)
    } else if (!config.filterBar) {
      return []
    }
  }

  render() {
    const { activeItem, config, hiddenNeg, hiddenPos, errorMessage, data, currentlyAdding, currentlyFilteredBy } = this.state;
    const { handleTableChange, deleteMe, addNew, fbAdd, filterWithBar } = this;
    const valuesForFilterBar = this.getValuesForFilterBar()
    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Grid.Column computer={14}>
          <Menu pointing size="huge" stackable>
            <Menu.Item
              name="Élèves"
              active={activeItem === "addgroup"}
              disabled={currentlyAdding.length !== 0}
              onClick={this.handleItemClick}
            />
            {
              Object.keys(collections).map((key, index) => (
                <div key={index}>
                  <Menu.Item
                    name={collections[key].title}
                    active={activeItem === collections[key].collname}
                    disabled={currentlyAdding.length !== 0 || this.state[collections[key].collname].length === 0}
                    onClick={this.handleItemClick}
                  />
                  <Loader active={this.state[collections[key].collname].length === 0} style={{ marginTop: -147 }} />
                </div>
              ))
            }

            <Menu.Menu
              position="right"
            >
              <Menu.Item
                name="Mes infos"
                active={activeItem === "infos"}
                disabled={currentlyAdding.length !== 0}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>
          <div>
            {
              activeItem === "addgroup"
                ? <Segment style={{ paddingBottom: 50 }}><AddGroup /></Segment>
                : activeItem === "infos"
                  ? <div>
                    Rubrique en cours de développement.
                    </div>
                  :
                  <Edit
                    config={config}
                    addNew={addNew}
                    fbAdd={fbAdd}
                    deleteMe={deleteMe}
                    handleTableChange={handleTableChange}
                    hiddenNeg={hiddenNeg}
                    hiddenPos={hiddenPos}
                    errorMessage={errorMessage}
                    data={data}
                    currentlyAdding={currentlyAdding}
                    filterWithBar={filterWithBar}
                    valuesForFilterBar={valuesForFilterBar}
                    currentlyFilteredBy={currentlyFilteredBy}
                  />
            }
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);