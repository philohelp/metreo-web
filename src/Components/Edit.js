import React from 'react';
import Table from "./Table.js";
import GroupFilters from "./GroupFilters"
import { textFilter } from 'react-bootstrap-table2-filter';

import { Grid, Button, Icon } from 'semantic-ui-react';

const Edit = (props) => {
    const { config, addNew, fbAdd, handleRedCrossButton, handleTableChange, data, currentlyAdding, filterWithBar, currentlyFilteredBy, valuesForFilterBar } = props;
    const { title, columns } = config;
    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <Button icon color="pink" onClick={() => handleRedCrossButton(rowIndex, row)}>
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
                        <Grid centered>
                            <Grid.Row style={{ marginBottom: 50 }}>
                                <Grid.Column mobile={16} tablet={16} computer={5}>
                                    <h1>Éditez vos {title.toLowerCase()}</h1>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={16} computer={9}>
                                    {
                                        currentlyAdding.length === 0 && config.filterBar &&
                                        <div style={{ textAlign: "right" }}>
                                            <GroupFilters filterWithBar={filterWithBar} currentlyFilteredBy={currentlyFilteredBy} valuesForFilterBar={valuesForFilterBar} />
                                        </div>
                                    }
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered style={{ marginBottom: -20 }}>
                                <Grid.Column mobile={16} tablet={12} computer={12}>
                                    Vous pouvez cliquer sur chaque information pour la modifier.
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={12} computer={2}>
                                    {
                                        currentlyAdding.length !== 0 ?
                                            <Button attached="top" color='teal' size='big' onClick={fbAdd} style={{ alignSelf: "flex-end" }}>
                                                <Icon name='check' />
                                                Sauvegarder
                                            </Button>
                                            :
                                            <Button attached="top" color='vk' size='big' onClick={() => addNew()} style={{ alignSelf: "flex-end" }}>
                                                <Icon name='add' />
                                                Ajouter
                                            </Button>
                                    }
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={16} computer={14}>
                                    <Table
                                        data={data}
                                        onTableChange={handleTableChange}
                                        handleRedCrossButton={handleRedCrossButton}
                                        columns={enhancedColumns()}
                                        deleteFormatter={deleteFormatter}
                                        currentlyAdding={currentlyAdding}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
            }
        </div>
    )
}

export default Edit;