import React from 'react';

import { Button } from 'semantic-ui-react';

const GroupFilters = (props) => {
    const { filterWithBar, currentlyFilteredBy, valuesForFilterBar } = props;
    return (
        <div>
            {valuesForFilterBar.map(value => <GButton filterWithBar={filterWithBar} value={value} key={value} currentlyFilteredBy={currentlyFilteredBy} />)}
            <Button size="small" basic={currentlyFilteredBy === "" ? false : true} onClick={() => filterWithBar("reset")}>
                TOUS
            </Button>
        </div>
    )
}

const GButton = (props) => {
    const { value,  filterWithBar, currentlyFilteredBy } = props;
    return (
        <Button basic={value === currentlyFilteredBy ? false : true} size="small" onClick={() => filterWithBar(value)}>
            {value}
        </Button>
    )
}

export default GroupFilters