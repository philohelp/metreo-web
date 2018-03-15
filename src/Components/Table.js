import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import "./../App.css";


const Table = (props) => {

    const cellEdit = cellEditFactory({
        mode: 'click',
        errorMessage: props.errorMessage,
    });

    const rowClasses = 'custom-row-class';

    return (
        <BootstrapTable
            remote={{ cellEdit: true }}
            keyField="id"
            data={props.data}
            columns={props.columns}
            cellEdit={cellEdit}
            onTableChange={props.onTableChange}
            rowClasses={rowClasses}
        />
    )
}

export default Table;

    // const selectRow = ({
    //     mode: 'checkbox',
    //     style: { background: 'red' }
    // });