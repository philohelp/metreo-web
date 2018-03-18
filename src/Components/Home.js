import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Menu, Segment } from "semantic-ui-react";

import AddGroup from "./AddGroup";
import Edit from "./Edit";
import { collections, studentsEdit, evalsEdit, commentsEdit, topicsEdit } from './../constants/edition';
import { db, auth } from './../firebase/firebase';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

var _ = require('lodash');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "addgroup",
      editConfig: {},
      data: [],
      search: "",
      errorMessage: null,
      hiddenNeg: true,
      hiddenPos: true,
      students: [],
      evals: [],
      comments: [],
      topics: [],
      currentlyAdding: [],
      selectedGroup: null,
      currentGroup: "",
      purged: []
    };
  }

  componentWillMount() {
    const uid = auth.currentUser.uid;
    collections.forEach(col => {
      db.collection("users").doc(uid).collection(col).get()
        .then(snapshot => {
          this.addSnapshotToState(snapshot, col)
        })
        .catch(err => {
          console.log('Error getting documents', err)
        });
    })
  }

  addSnapshotToState = (snapshot, whichData) => {
    let container = []
    let newdoc = {}
    snapshot.forEach(doc => {
      newdoc = doc.data();
      newdoc.id = doc.id;
      newdoc.edit = "truc";
      container.push(newdoc);
    });
    switch (whichData) {
      case "students":
        return this.setState({ students: container });
      case "evals":
        return this.setState({ evals: container });
      case "comments":
        return this.setState({ comments: container });
      case "topics":
        return this.setState({ topics: container });
      default:
        return
    }
  }

  handleItemClick = (e, { name }) => {
    const { students, evals, comments, topics } = this.state;
    switch (name) {
      case "Élèves":
        console.log(this.state["evals"])
        return this.setState({ activeItem: "addgroup" })
      case "Classes":
        return this.setState({ editConfig: studentsEdit, data: students, activeItem: "students" })
      case "Évaluations":
        return this.setState({ editConfig: evalsEdit, data: evals, activeItem: "evals" })
      case "Remarques":
        return this.setState({ editConfig: commentsEdit, data: comments, activeItem: "comments" })
      case "Sujets":
        return this.setState({ editConfig: topicsEdit, data: topics, activeItem: "topics" })
      case "Mes infos":
        return this.setState({ activeItem: "infos" })
      default:
        return
    }
  };

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
    this.setState({ currentlyAdding, data, currentGroup: "" })
    console.log("CA", currentlyAdding, "data", data)
  }

  fbAdd = () => {
    const uid = auth.currentUser.uid;
    const { activeItem, currentlyAdding, data } = this.state;
    currentlyAdding.forEach(newRow => {
      let newValue = data.find(row => row.id === newRow.id)
      db.collection("users").doc(uid).collection(activeItem).add(newValue)
        .then(ref => {
          console.log("Élément ajouté !", ref);
          newValue.id = ref.id
          this.refreshData(newValue)
        })
    })
    this.setState({ currentlyAdding: [] })
  }

  refreshData = (newValue) => {
    const { activeItem, students, evals, comments, topics } = this.state;
    switch (activeItem) {
      case "students":
        if (newValue) { students.push(newValue) }
        this.setState({ data: students })
        break;
      case "evals":
        if (newValue) { evals.push(newValue) }
        this.setState({ data: evals })
        break;
      case "comments":
        if (newValue) { comments.push(newValue) }
        this.setState({ data: comments })
        break;
      case "topics":
        if (newValue) { topics.push(newValue) }
        this.setState({ data: topics })
        break;
      default:
        return
    }
  }

  deleteMe = (rowIndex, rowId) => {
    const { data, currentlyAdding } = this.state;
    var purged = _.remove(data, (item) => item.id === rowId);
    this.setState({ purged })
    if (currentlyAdding.length === 0) {
      // delete op
      this.updateState(data)
      this.fbRemove(rowId)
      return
    } else {
      // cancel op
      this.setState({ currentlyAdding: [] })
      this.refreshData()
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
      this.updateState(newData)
    } else {
      this.setState({ data: newData })
    }
  }

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
    this.updateState(result)
  }

  setSelectedGroup = (studsInGroup, group) => {
    if (studsInGroup[0] === "reset") {
      this.setState({ selectedGroup: null, currentGroup: "" })
      this.refreshData()
      console.log("tous")
    } else {
      this.setState({ selectedGroup: studsInGroup, data: studsInGroup, currentGroup: group })
    }
  }

  setBackData = () => {
    const { activeItem, students, evals, comments, topics, selectedGroup } = this.state;
    if (selectedGroup) {
      console.log("returning sg")
      return selectedGroup
    } else if (selectedGroup === null) {
      switch (activeItem) {
        case "students":
          return students;
        case "evals":
          return evals;
        case "comments":
          return comments;
        case "topics":
          return topics;
        default:
          return []
      }
    }
  }

  handleSearch = (props) => {
    const { filters } = props
    const backData = this.setBackData();
    // setTimeout(() => {
    const result = backData.filter((row) => {
      let valid = true;
      for (const dataField in filters) {
        const { filterVal, filterType, comparator } = filters[dataField];
        if (filterType === 'TEXT') {
          if (comparator === "LIKE") {
            valid = row[dataField].toString().indexOf(filterVal) > -1;
            console.log("valid", valid)
          } else {
            valid = row[dataField] === filterVal;
            console.log("invalid")
          }
        }
        if (!valid) break;
      }
      return valid;
    });
    console.log(result)
    this.setState(() => ({
      data: result
    }));
    // }, 500);
  }

  handleTableChange = (type, { ...props }) => {
    console.log(type)
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

  updateState(newData) {
    const { activeItem } = this.state;
    this.setState(() => ({
      data: newData,
      errorMessage: null
    }));
    switch (activeItem) {
      case "students":
        return this.setState({ students: newData })
      case "evals":
        return this.setState({ evals: newData })
      case "comments":
        return this.setState({ comments: newData })
      case "topics":
        return this.setState({ topics: newData })
      default:
        return
    }
  }

  async fbEdit(rowId, newValue) {
    const uid = auth.currentUser.uid;
    const { activeItem } = this.state;
    console.log(rowId, newValue)
    if (rowId.length === 20) {
      await db.collection("users").doc(uid).collection(activeItem).doc(rowId).set(newValue)
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
    const { activeItem } = this.state;
    await db.collection("users").doc(uid).collection(activeItem).doc(rowId).delete()
      .then(ref => {
        console.log("Élément supprimé !", rowId);
      });
  }

  render() {
    const { activeItem, editConfig, hiddenNeg, hiddenPos, errorMessage, data, currentlyAdding, students, currentGroup } = this.state;
    const { handleTableChange, deleteMe, addNew, fbAdd, setSelectedGroup } = this;
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
            <Menu.Item
              name="Classes"
              active={activeItem === "students"}
              disabled={currentlyAdding.length !== 0}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Évaluations"
              active={activeItem === "evals"}
              disabled={currentlyAdding.length !== 0}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Remarques"
              active={activeItem === "comments"}
              disabled={currentlyAdding.length !== 0}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Sujets"
              active={activeItem === "topics"}
              disabled={currentlyAdding.length !== 0}
              onClick={this.handleItemClick}
            />
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
                    Hello mes infos
                            </div>
                  :
                  <Edit editConfig={editConfig} addNew={addNew} fbAdd={fbAdd} deleteMe={deleteMe} handleTableChange={handleTableChange} hiddenNeg={hiddenNeg} hiddenPos={hiddenPos} errorMessage={errorMessage} data={data} currentlyAdding={currentlyAdding} setSelectedGroup={setSelectedGroup} students={students} currentGroup={currentGroup} />
            }
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);