/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'KanbanBoard.Application',

    name: 'KanbanBoard',

    requires: [
        // This will automatically load all classes in the KanbanBoard namespace
        // so that application classes do not need to require each other.
        'KanbanBoard.*'
    ],

    // The name of the initial view to create.
    mainView: 'KanbanBoard.view.main.Main'
});
