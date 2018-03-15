import React from 'react';
import withAuthorization from './withAuthorization';
import Table from "./Table.js";
import { evalsRef } from './../firebase/db';

import { Grid, Message, Button, Icon } from 'semantic-ui-react';

class EditEvals extends React.Component {
    constructor(props) {
        super(props);
        this.myref = evalsRef();
        this.state = {
            data: [],
            errorMessage: null,
            hiddenNeg: true,
            hiddenPos: true,
        };
    }

    async componentWillMount() {
        let data = [];
        let newdoc = {};
        const { myref } = this;
        await myref.get()
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

    handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
        const result = data.map((row) => {
            if (row.id === rowId) {
                const newRow = { ...row };
                newRow[dataField] = newValue;
                this.sendToFb(rowId, newRow)
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

    deleteMe = (rowIndex) => {
        console.log(rowIndex)
        const { data } = this.state;
        data.splice(rowIndex, 1)
        this.setState({ data });
    }

    deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { deleteMe } = this;
        return (
            <Button icon labelPosition='left' onClick={() => deleteMe(rowIndex)}>
                <Icon name='remove' />
                Enlever
            </Button>
        );
    }

    render() {
        const { data, hiddenNeg, hiddenPos, errorMessage } = this.state;
        const { deleteMe, handleTableChange, deleteFormatter } = this;
        const columns = [{
            dataField: 'coeff',
            text: 'Coefficient',
            align: "center",
            editCellClasses: 'cell-edit'
        },
        {
            dataField: 'exerctype',
            text: 'Type',
            align: "center",
            hidden: true
        },
        {
            dataField: 'evalab',
            text: 'Nom',
            editCellClasses: 'cell-edit',
        },
        {
            dataField: 'desc',
            text: 'Description',
            editCellClasses: 'cell-edit',
        },
        {
            dataField: 'hidden',
            text: 'Désactivé',
            editCellClasses: 'cell-edit',
            hidden: true
        },
        {
            dataField: 'matter',
            text: 'Discipline',
            editCellClasses: 'cell-edit',
            hidden: true
        },
        {
            dataField: 'rating',
            text: 'Note par défaut',
            editCellClasses: 'cell-edit',
            hidden: true
        },
        {
            dataField: 'edit',
            text: '',
            editable: false,
            align: "center",
            formatter: deleteFormatter,
        },
        ];
        return (
            <div>
                {
                    !data ?
                        <div>Entrain de charger</div>
                        :
                        <div>
                            <Message negative hidden={hiddenNeg}>
                                Oups.... il manque des informations. Merci de bien vouloir recommencer.
                            </Message>
                            <Message info hidden={hiddenPos}>
                                Vous ajoutez une classe
                            </Message>
                            <Grid columns={1} centered>
                                <Grid.Column mobile={16} tablet={12} computer={10}>
                                    <h1 style={{ marginTop: 50, marginBottom: 20 }}>Personnalisez vos évaluations</h1>
                                    <div style={{ fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                        Vous pouvez cliquer sur chaque information pour la modifier.
                                    </div>
                                    <Table
                                        data={data}
                                        errorMessage={errorMessage}
                                        onTableChange={handleTableChange}
                                        deleteMe={deleteMe}
                                        columns={columns}
                                        deleteFormatter={deleteFormatter}
                                    />
                                </Grid.Column>
                            </Grid>
                        </div>
                }
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(EditEvals);