/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListBacklogTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-backlog-tasks',
  userCls: 'list-backlog-tasks',

  title: 'Backlog',

  bind: {
    store: '{backlogTasks}'
  }

});
