/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListCurrentTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-current-tasks',
  userCls: 'list-current-tasks',

  title: 'In Bearbeitung',

  bind: {
    store: '{currentTasks}'
  }

});
