export const collections = ["students", "evals", "comments", "topics"]

export const studentsEdit = {
    title: "élèves",
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
    ],
    fake: [{ id: "1", name: "bla", authname: "bli", firstname: "blu", group: "bloublou", edit: "blo" }, { id: "2", name: "bla", authname: "bliqdfqf", firstname: "bluqfdsqf", group: "bloubloudfqsf", edit: "blocfqds" }],
}

export const evalsEdit = {
    title: "évaluations",
    columns: [
        {
            dataField: 'coeff',
            text: 'Coefficient',
            align: "center",
            headerStyle: { width: 100 },
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
    ],
    fake: [{ id: "1", coeff: "bla", exerctype: "bli", evalab: "blu", desc: "blo", hidden: "bla", matter: "bli", rating: "blu" }, { id: "2", coeff: "bla", exerctype: "bli", evalab: "blu", desc: "blo", hidden: "bla", matter: "bli", rating: "blu" }],
}

export const commentsEdit = {
    title: "remarques",
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
            editCellClasses: 'cell-edit',
            sort: true
        },
        {
            dataField: 'txt',
            text: 'Texte',
            headerStyle: { width: "60%" },
            editCellClasses: 'cell-edit',
            filter: true,
            // sort: true
        },
        {
            dataField: 'hidden',
            text: 'Désactivé',
            editCellClasses: 'cell-edit',
            hidden: true
        }
    ],
    fake: [{ id: "1", exerctype: "bla", evalab: "bli", txt: "blu", hidden: "blo" }, { id: "2", exerctype: "bla", evalab: "bli", txt: "blu", hidden: "blo" }],
}

export const topicsEdit = {
    title: "sujets",
    columns: [{
        dataField: 'exerctype',
        text: 'Type',
        editCellClasses: 'cell-edit',
        hidden: true
    },
    {
        dataField: 'authname',
        text: 'Auteur',
        editCellClasses: 'cell-edit',
        headerStyle: { width: "20%" },
        filter: true
    },
    {
        dataField: 'title',
        text: 'Titre',
        editCellClasses: 'cell-edit',
        filter: true,
        sort: true
    }
    ],
    fake: [{ id: "1", exerctype: "bla", authname: "bli", title: "blu", edit: "blo" }, { id: "2", exerctype: "blap", authname: "blim blim", title: "bludde", edit: "blousd" }],
}