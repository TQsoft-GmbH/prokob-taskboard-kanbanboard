/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListOpenTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-open-tasks',
  userCls: 'list-open-tasks',

  title: 'Offen',

  bind: {
    store: '{openTasks}'
  }

});
