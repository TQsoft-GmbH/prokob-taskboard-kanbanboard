/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListLaterTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-later-tasks',
  userCls: 'list-later-tasks',

  title: 'Später',

  bind: {
    store: '{laterTasks}'
  }

});
