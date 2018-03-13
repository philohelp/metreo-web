import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Button, Icon } from 'semantic-ui-react'
import "./../App.css";


const Table = (props) => {

    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { deleteMe } = props;
        return (
            <Button icon labelPosition='left' onClick={() => deleteMe(rowIndex)}>
                <Icon name='remove' />
                Enlever
            </Button>
        );
    }

    const columns = [{
        dataField: 'firstname',
        text: 'Prénom',
        editCellClasses: 'cell-edit'
    }, {
        dataField: 'name',
        text: 'Nom',
        editCellClasses: 'cell-edit'
    },
    {
        dataField: 'group',
        text: 'Classe',
        editCellClasses: 'cell-edit'
    },
    {
        dataField: 'edit',
        text: '',
        editable: false,
        align: "center",
        formatter: deleteFormatter
    },
    ];

    const cellEdit = cellEditFactory({
        mode: 'click',
        errorMessage: props.errorMessage,
    });

    return (
        <BootstrapTable
            remote={{ cellEdit: true }}
            keyField="id"
            data={props.data}
            columns={columns}
            cellEdit={cellEdit}
            onTableChange={props.onTableChange}
        />
    )
}

export default Table;

    // const selectRow = ({
    //     mode: 'checkbox',
    //     style: { background: 'red' }
    // });