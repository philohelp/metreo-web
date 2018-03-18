import React from 'react';
import Table from "./Table.js";
import GroupFilters from "./GroupFilters"
import { textFilter } from 'react-bootstrap-table2-filter';

import { Grid, Message, Button, Icon } from 'semantic-ui-react';

const Edit = (props) => {
    const { hiddenNeg, hiddenPos, errorMessage, config, addNew, fbAdd, deleteMe, handleTableChange, data, currentlyAdding, filterWithBar, currentlyFilteredBy, valuesForFilterBar } = props;
    const { title, columns } = config;
    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { deleteMe } = props;
        const rowId = row.id;
        return (
            <div>
                <Button icon color="pink" onClick={() => deleteMe(rowIndex, rowId)}>
                    <Icon name='remove' />
                </Button>
            </div>
        );
    }
    const enhancedColumns = () => {
        if (currentlyAdding.length !== 0) {
            columns.forEach(col => delete col.filter)
            return (
                [...columns,
                {
                    dataField: 'edit',
                    text: '',
                    editable: false,
                    align: "center",
                    headerStyle: { width: 120 },
                    formatter: deleteFormatter
                }]
            )
        } else if (currentlyAdding.length === 0) {
            columns.forEach(col => {
                if (col.filter === true) {
                    col.filter = textFilter()
                }
            })
            return (
                [...columns,
                {
                    dataField: 'edit',
                    text: '',
                    editable: false,
                    align: "center",
                    headerStyle: { width: 120 },
                    formatter: deleteFormatter
                }]
            )
        }
    }
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
                                <div style={{ fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 50 }} >
                                    <h1>Éditez vos {title}</h1>
                                    {
                                        currentlyAdding.length === 0 && config.filterBar &&
                                        <GroupFilters filterWithBar={filterWithBar} currentlyFilteredBy={currentlyFilteredBy} valuesForFilterBar={valuesForFilterBar} />
                                    }

                                </div>
                                <div style={{ fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                    Vous pouvez cliquer sur chaque information pour la modifier.
                                    {
                                        currentlyAdding.length !== 0 ?
                                            <Button attached="top" color='teal' onClick={fbAdd} style={{ alignSelf: "flex-end" }}>
                                                <Icon name='check' />
                                                Sauvegarder
                                            </Button>
                                            :
                                            <Button attached="top" color='vk' onClick={addNew} style={{ alignSelf: "flex-end" }}>
                                                <Icon name='add' />
                                                Ajouter
                                            </Button>
                                    }
                                </div>
                                <Table
                                    data={data}
                                    errorMessage={errorMessage}
                                    onTableChange={handleTableChange}
                                    deleteMe={deleteMe}
                                    columns={enhancedColumns()}
                                    deleteFormatter={deleteFormatter}
                                    currentlyAdding={currentlyAdding}
                                />
                            </Grid.Column>
                        </Grid>
                    </div>
            }
        </div>
    )
}

export default Edit;