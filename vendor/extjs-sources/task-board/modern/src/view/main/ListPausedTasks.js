/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListPausedTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-paused-tasks',
  userCls: 'list-paused-tasks',

  title: 'Pausiert',

  bind: {
    store: '{pausedTasks}'
  }

});
