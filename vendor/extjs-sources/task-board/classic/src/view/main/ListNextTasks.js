/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListNextTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-next-tasks',
  userCls: 'list-next-tasks',

  title: 'Als Nächstes',

  bind: {
    store: '{nextTasks}'
  }

});
