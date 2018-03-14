import React from 'react';
import withAuthorization from './withAuthorization';
import Table from "./Table.js";

import { Grid, Form, Input, Message, Button, Step, Segment } from 'semantic-ui-react'
import CSVReader from 'react-csv-reader';
import 'bootstrap/dist/css/bootstrap.css';

class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errorMessage: null,
      group: "",
      hiddenNeg: true,
      hiddenPos: true,
      showStep: 1
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.sendToFb = this.sendToFb.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelOp = this.cancelOp.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
  }

  handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
    const result = data.map((row) => {
      if (row.id === rowId) {
        const newRow = { ...row };
        newRow[dataField] = newValue;
        return newRow;
      }
      return row;
    });
    this.setState(() => ({
      data: result,
      errorMessage: null
    }));
    console.log(result)
  }

  handleFileUpload(file) {
    file.shift()
    let data = [];
    let i = 0
    file.forEach(stud => {
      const formData = stud[0]
      let student = {}
      let nameArr = formData.split(' ');
      const id = i.toString();
      student.id = id;
      student.firstname = nameArr.pop();
      student.name = nameArr.join(' ');
      student.group = this.state.group;
      student.edit = "truc"
      const testStr = student.name.charAt(student.name.length - 1)
      if (testStr === testStr.toLowerCase()) {
        let newNameArr = student.name.split(' ');
        student.firstname = newNameArr.pop();
        student.name = newNameArr.join(' ');
      }
      data.push(student)
      i++
    })
    console.log(data)
    this.setState({ data, showStep: 3 })
  }

  handleFileError(error) {
    console.log(error)
  }

  handleChange(value) {
    this.setState({ group: value, hiddenPos: false })
    console.log(value)
  }

  onSubmit() {
    this.setState({ showStep: 2 })
  }

  sendToFb() {
    let data = this.state.data;

    // this.setState({ visible: true })
    // if (group === "" || data === []) {
    //   this.setState({ hidden: false })
    // }
    // const newItem = { id: "64837", name: "Betrand", firstname: "Plastic", group: "No se" }
    // data.push(newItem)
    data.splice(0, 1)
    console.log(data)
    this.setState({ data })
  }

  onDismiss() {
    this.setState({ hidden: true });
  }

  cancelOp() {
    this.setState({ showStep: 1 });
  }

  deleteMe(rowIndex) {
    console.log(rowIndex)
    const { data } = this.state;
    data.splice(rowIndex, 1)
    this.setState({ data });
  }

  render() {
    const { data, group, showStep, hiddenNeg, hiddenPos } = this.state;
    const { deleteMe } = this;
    return (
      <div>
        <Message negative hidden={hiddenNeg}>
          Oups.... il manque des informations. Merci de bien vouloir recommencer.
        </Message>
        <Message info hidden={hiddenPos}>
          Vous ajoutez une classe de {group}
        </Message>

        <Grid columns={1} centered>
          <Grid.Column mobile={16} tablet={12} computer={10}>
            <h1 style={{ marginTop: 50, marginBottom: 20 }}>Ajoutez une liste d'élèves à votre application</h1>
            <Step.Group fluid>
              <Step completed={showStep > 1 ? true : false} active={showStep === 1 ? true : false} disabled={showStep === 1 ? false : true}>
                <Step.Content>
                  <Step.Title><h2>Étape 1</h2></Step.Title>
                  <Step.Description><h3>Donnez un nom à votre classe.</h3></Step.Description>
                </Step.Content>
              </Step>
              <Step completed={showStep > 2 ? true : false} active={showStep === 2 ? true : false} disabled={showStep === 2 ? false : true}>
                <Step.Content>
                  <Step.Title><h2>Étape 2</h2></Step.Title>
                  <Step.Description><h3>Téléchargez la liste des élèves.</h3></Step.Description>
                </Step.Content>
              </Step>
              <Step completed={showStep > 3 ? true : false} active={showStep === 3 ? true : false} disabled={showStep === 3 ? false : true}>
                <Step.Content>
                  <Step.Title><h2>Étape 3</h2></Step.Title>
                  <Step.Description><h3>Vérifiez et validez.</h3></Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            <div style={{ marginTop: 20 }}>
              {
                showStep === 1 ?
                  <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                      <Input
                        id="classe"
                        action={{ color: 'teal', content: 'Valider', size: 'large' }}
                        value={group}
                        placeholder="ex. TL"
                        style={{ fontSize: 15 }}
                        onChange={event => this.handleChange(event.target.value)}
                      />
                    </Form.Field>
                  </Form>
                  :
                  showStep === 2 ?
                    <CSVReader
                      cssClass="csv-input"
                      label={`Sélectionnez le fichier (par ex. 'Export CSV') pour les élèves de ${group}.`}
                      onFileLoaded={this.handleFileUpload}
                      onError={this.handleFileError}
                    />
                    :
                    showStep === 3 ?
                      <div style={{ marginTop: 40 }}>
                        <div style={{ fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                          Vous pouvez cliquer sur chaque information pour la modifier. Validez quand vous êtes prêt.
                        <Button.Group size='large' style={{ alignSelf: "flex-end" }}>
                            <Button attached="top" color='vk' onClick={this.cancelOp}>Annuler</Button>
                            <Button.Or attached="top" text="ou" />
                            <Button attached="top" color='teal' onClick={this.sendToFb}>Valider</Button>
                          </Button.Group>
                        </div>
                        <Segment attached>
                          <Table
                            data={data}
                            errorMessage={this.state.errorMessage}
                            onTableChange={this.handleTableChange}
                            deleteMe={this.deleteMe}
                          />
                        </Segment>
                      </div>
                      :
                      null
              }
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddGroup);

