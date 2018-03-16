import React from 'react';
import Table from "./Table.js";

import { Grid, Message, Button, Icon } from 'semantic-ui-react';

const Edit = (props) => {

    const { hiddenNeg, hiddenPos, errorMessage, editConfig, addNew, fbAdd, deleteMe, handleTableChange, data, currentlyAdding } = props;
    const { title, columns } = editConfig;
    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { deleteMe } = props;
        const rowId = row.id;
        return (
            <Button icon labelPosition='left' onClick={() => deleteMe(rowIndex, rowId)}>
                <Icon name='remove' />
                Enlever
            </Button>
        );
    }
    const enhancedColumns = [...columns,
    {
        dataField: 'edit',
        text: '',
        editable: false,
        align: "center",
        formatter: deleteFormatter
    }
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
                                <h1 style={{ marginTop: 50, marginBottom: 20 }}>Éditez vos {title}</h1>
                                <div style={{ fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                    Vous pouvez cliquer sur chaque information pour la modifier.
                                    <Button attached="top" color='vk' onClick={addNew} style={{ alignSelf: "flex-end" }}>
                                        <Icon name='add' />
                                        Ajouter
                                    </Button>
                                    {
                                        currentlyAdding.length !== 0 ?
                                            <Button attached="top" color='vk' onClick={fbAdd} style={{ alignSelf: "flex-end" }}>
                                                <Icon name='add' />
                                                Sauvegarder
                                    </Button>
                                            :
                                            null
                                    }
                                </div>
                                <Table
                                    data={data}
                                    errorMessage={errorMessage}
                                    onTableChange={handleTableChange}
                                    deleteMe={deleteMe}
                                    columns={enhancedColumns}
                                    deleteFormatter={deleteFormatter}
                                />
                            </Grid.Column>
                        </Grid>
                    </div>
            }
        </div>
    )
}

export default Edit;