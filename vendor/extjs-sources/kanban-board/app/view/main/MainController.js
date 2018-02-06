/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('KanbanBoard.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  init: function() {
    // update store every minute
    var runner = new Ext.util.TaskRunner();
    runner.start({
      run: function() {
        Ext.getStore('tasks').load();
      },
      interval: 60000
    });

    // this.listen({
    // });
  }


});
