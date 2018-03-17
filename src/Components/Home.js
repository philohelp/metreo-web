import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Menu, Segment } from "semantic-ui-react";

import AddGroup from "./AddGroup";
import Edit from "./Edit";
import { studentsEdit, evalsEdit, commentsEdit, topicsEdit } from './../constants/edition';
import { db, auth } from './../firebase/firebase';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "addgroup",
      editConfig: {},
      data: [],
      errorMessage: null,
      hiddenNeg: true,
      hiddenPos: true,
      students: [],
      evals: [],
      comments: [],
      topics: [],
      currentlyAdding: []
    };
  }

  async componentWillMount() {
    const uid = auth.currentUser.uid;
    await db.collection("users").doc(uid).collection("students").get()
      .then(snapshot => {
        this.addSnapshotToState(snapshot, "students")
      })
      .catch(err => {
        console.log('Error getting documents', err)
      });
    await db.collection("users").doc(uid).collection("evals").get()
      .then(snapshot => {
        this.addSnapshotToState(snapshot, "evals")
      })
      .catch(err => {
        console.log('Error getting documents', err)
      });
    await db.collection("users").doc(uid).collection("comments").get()
      .then(snapshot => {
        this.addSnapshotToState(snapshot, "comments")
      })
      .catch(err => {
        console.log('Error getting documents', err)
      });
    await db.collection("users").doc(uid).collection("topics").get()
      .then(snapshot => {
        this.addSnapshotToState(snapshot, "topics")
      })
      .catch(err => {
        console.log('Error getting documents', err)
      });
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
    const { students, evals, comments, topics } = this.state
    switch (name) {
      case "Élèves":
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
    const id = `new${data.length + 1}-${random}`;
    const newDoc = { id }
    data.push(newDoc)
    currentlyAdding.push(newDoc)
    this.setState({ currentlyAdding })
    this.updateState(data)
  }

  deleteMe = (rowIndex, rowId) => {
    console.log(rowIndex)
    const { data } = this.state;
    data.splice(rowIndex, 1)
    this.updateState(data)
    this.fbRemove(rowId)
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
    this.updateState(newData)
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

  handleTableChange = (type, { ...props }) => {
    console.log(type)
    switch (type) {
      case "sort":
        return this.handleSort(props.data, props.sortField, props.sortOrder)
      case "cellEdit":
        return this.handleEdit(props.data, props.cellEdit)
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

  fbAdd = () => {
    const uid = auth.currentUser.uid;
    const { activeItem, currentlyAdding, data } = this.state;
    console.log(currentlyAdding, data)
    currentlyAdding.forEach(newRow => {
      const newValue = data.find(row => row.id === newRow.id)
      db.collection("users").doc(uid).collection(activeItem).add(newValue)
        .then(ref => {
          console.log("Élément ajouté !", newValue);
        });
    })
    this.setState({ currentlyAdding: [] })
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
    const { activeItem, editConfig, hiddenNeg, hiddenPos, errorMessage, data, currentlyAdding } = this.state;
    const { handleTableChange, deleteMe, addNew, fbAdd } = this;
    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Grid.Column computer={14}>
          <Menu pointing size="huge" stackable>
            <Menu.Item
              name="Élèves"
              active={activeItem === "addgroup"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Classes"
              active={activeItem === "students"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Évaluations"
              active={activeItem === "evals"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Remarques"
              active={activeItem === "comments"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Sujets"
              active={activeItem === "topics"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu
              position="right"
            >
              <Menu.Item
                name="Mes infos"
                active={activeItem === "infos"}
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
                  <Edit editConfig={editConfig} addNew={addNew} fbAdd={fbAdd} deleteMe={deleteMe} handleTableChange={handleTableChange} hiddenNeg={hiddenNeg} hiddenPos={hiddenPos} errorMessage={errorMessage} data={data} currentlyAdding={currentlyAdding} />
            }
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);