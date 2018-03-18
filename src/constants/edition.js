export const collections = {
    students: {
        collname: "students",
        title: "Classes",
        filterBar: "group",
        columns: [
            {
                dataField: 'name',
                text: 'Nom',
                editCellClasses: 'cell-edit',
                filter: true,
                sort: true
            }, {
                dataField: 'firstname',
                text: 'Prénom',
                editCellClasses: 'cell-edit',
                filter: true,
                sort: true
            },
            {
                dataField: 'group',
                text: 'Classe',
                headerStyle: { width: 150 },
                editCellClasses: 'cell-edit',
                filter: true,
                sort: true
            }
        ]
    },
    evals: {
        collname: "evals",
        title: "Évaluations",
        columns: [
            {
                dataField: 'coeff',
                text: 'Coefficient',
                align: "center",
                headerStyle: { width: 100 },
                sort: true,
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
                headerStyle: { width: "10%" },
            },
            {
                dataField: 'desc',
                text: 'Description',
                headerStyle: { width: "50%" },
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
            }
        ]
    },
    comments: {
        collname: "comments",
        title: "Remarques",
        filterBar: "evalab",
        columns: [
            {
                dataField: 'exerctype',
                text: 'Type',
                editCellClasses: 'cell-edit',
                hidden: true
            },
            {
                dataField: 'evalab',
                text: 'Critère',
                editable: false,
                headerStyle: { width: "10%" },
                editCellClasses: 'cell-edit',
                sort: true
            },
            {
                dataField: 'txt',
                text: 'Texte',
                headerStyle: { width: "60%" },
                editCellClasses: 'cell-edit'
            },
            {
                dataField: 'hidden',
                text: 'Désactivé',
                editCellClasses: 'cell-edit',
                hidden: true
            }
        ]
    },
    topics: {
        collname: "topics",
        title: "Sujets",
        filterBar: "exerctype",
        columns: [
            {
                dataField: 'exerctype',
                text: 'Type',
                editCellClasses: 'cell-edit',
                headerStyle: { width: "10%" },
                sort: true,
                // hidden: true
            },
            {
                dataField: 'authname',
                text: 'Auteur',
                editCellClasses: 'cell-edit',
                headerStyle: { width: "10%" },
                sort: true,
                // filter: true
            },
            {
                dataField: 'title',
                text: 'Titre',
                editCellClasses: 'cell-edit',
                sort: true,
                // filter: true,
            }
        ]
    }
}