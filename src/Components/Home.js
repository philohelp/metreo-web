import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Menu, Segment } from "semantic-ui-react";

import AddGroup from "./AddGroup";
import EditStudents from "./EditStudents";
import EditEvals from "./EditEvals";
import EditComs from "./EditComs";

import Edit from "./Edit";
import { studentsEdit, evalsEdit, commentsEdit, topicsEdit } from './../constants/edition';
import { evalsRef } from './../firebase/db';
import { db, auth } from './../firebase/firebase';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Élèves",
      editFields: {},
      data: [],
      errorMessage: null,
      hiddenNeg: true,
      hiddenPos: true
    };
  }

  async loadData(collection) {
    let data = [];
    let newdoc = {};
    const uid = auth.currentUser.uid;
    await db.collection("users").doc(uid).collection(collection).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          newdoc = doc.data();
          newdoc.id = doc.id;
          newdoc.edit = "truc";
          data.push(newdoc);
        });
        this.setState({
          data
        });
        console.log("Docs have arrived", data[0])
      })
      .catch(err => {
        console.log('Error getting documents', err)
      });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    switch (name) {
      case "Classes":
        this.setState({ editFields: studentsEdit })
        this.loadData("students");
        break;
      case "Évaluations":
        this.setState({ editFields: evalsEdit })
        this.loadData("evals");
        break;
      case "Remarques":
        this.setState({ editFields: commentsEdit })
        this.loadData("comments");
        break;
      case "Sujets":
        this.setState({ editFields: topicsEdit })
        this.loadData("topics");
        break;
      default:
        return
    }
  };

  handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
    const result = data.map((row) => {
      if (row.id === rowId) {
        const newRow = { ...row };
        newRow[dataField] = newValue;
        // this.sendToFb(rowId, newRow)
        return newRow;
      }
      return row;
    });
    this.setState(() => ({
      data: result,
      errorMessage: null
    }));
  }

  async sendToFb(rowId, newValue) {
    const myref = this.myref;
    await myref.doc(rowId).set(newValue)
      .then(ref => {
        console.log("Sujet modifié !", rowId, newValue);
      });
  }

  addMe = () => {
    let { data } = this.state;
    const id = `aaa${data.length + 1}`;
    const newDoc = { id, exerctype: "[Nouvelle entrée]", authname: "[Nouvelle entrée]", title: "[Nouvelle entrée]", edit: "[Nouvelle entrée]" }
    data.push(newDoc)
    this.setState({ data })
  }

  deleteMe = (rowIndex) => {
    console.log(rowIndex)
    const { data } = this.state;
    data.splice(rowIndex, 1)
    this.setState({ data });
  }

  render() {
    const { activeItem, editFields, hiddenNeg, hiddenPos, errorMessage, data } = this.state;
    const { handleTableChange, deleteMe, addMe } = this;
    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Grid.Column computer={14}>
          <Menu pointing size="huge" stackable>
            <Menu.Item
              name="Élèves"
              active={activeItem === "Élèves"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Classes"
              active={activeItem === "Classes"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Évaluations"
              active={activeItem === "Évaluations"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Remarques"
              active={activeItem === "Remarques"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Sujets"
              active={activeItem === "Sujets"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu
              position="right"
            >
              <Menu.Item
                name="Mes infos"
                active={activeItem === "Mes infos"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>
          <div>
            {
              activeItem === "Élèves"
                ? <Segment style={{ paddingBottom: 50 }}><AddGroup /></Segment>
                : activeItem === "Mes infos"
                  ? <div>
                    Hello mes infos
                            </div>
                  :
                  <Edit editFields={editFields} addMe={addMe} deleteMe={deleteMe} handleTableChange={handleTableChange} hiddenNeg={hiddenNeg} hiddenPos={hiddenPos} errorMessage={errorMessage} data={data} />
            }

          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);