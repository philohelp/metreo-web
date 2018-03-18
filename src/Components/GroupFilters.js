import React from 'react';

import { Button } from 'semantic-ui-react';

var _ = require('lodash');

const extractClasses = (students) => {
    const allgroups = _.map(students, 'group');
    const groupes = _.uniq(allgroups)
    return groupes
}

const filterStudents = (group, students) => {
    const studsInGroup = students.filter(student => student.group === group)
    return studsInGroup
}

const GroupFilters = (props) => {
    const { students, setSelectedGroup, currentGroup } = props;
    const groupes = extractClasses(students);
    return (
        <div>
            {groupes.map(groupe => <GButton setSelectedGroup={setSelectedGroup} groupe={groupe} key={groupe} students={students} currentGroup={currentGroup} />)}
            <Button size="small" basic={currentGroup === "" ? false : true} onClick={() => setSelectedGroup(["reset"])}>
                TOUS
            </Button>
        </div>
    )
}

const GButton = (props) => {
    const { groupe, setSelectedGroup, students, currentGroup } = props;
    const studsInGroup = filterStudents(groupe, students);
    console.log("groupe", groupe, "currentGroup", currentGroup)
    return (
        <Button basic={groupe === currentGroup ? false : true} size="small" onClick={() => setSelectedGroup(studsInGroup, groupe)}>
            {groupe}
        </Button>
    )
}

export default GroupFilters