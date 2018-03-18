import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import "./../App.css";


const Table = (props) => {

    const cellEdit = cellEditFactory({
        mode: 'click',
        blurToSave: true
    });

    const rowClasses = 'custom-row-class';

    return (
        <BootstrapTable
            remote={{ sort: true, cellEdit: true, filter: true }}
            keyField="id"
            data={props.data}
            filter={filterFactory()}
            columns={props.columns}
            cellEdit={cellEdit}
            onTableChange={props.onTableChange}
            rowClasses={rowClasses}
            printable
        />
    )
}

export default Table;

    // const selectRow = ({
    //     mode: 'checkbox',
    //     style: { background: 'red' }
    // });