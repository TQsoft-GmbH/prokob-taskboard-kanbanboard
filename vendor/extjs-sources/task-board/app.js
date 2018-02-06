/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'TaskBoard.Application',

    name: 'TaskBoard',

    requires: [
        // This will automatically load all classes in the TaskBoard namespace
        // so that application classes do not need to require each other.
        'TaskBoard.*'
    ],

    // The name of the initial view to create.
    mainView: 'TaskBoard.view.main.Main'
});
