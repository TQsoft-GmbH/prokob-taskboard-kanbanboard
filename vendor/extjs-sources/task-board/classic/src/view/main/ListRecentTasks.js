/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListRecentTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-recent-tasks',
  userCls: 'list-recent-tasks',

  title: 'Kürzlich',

  features: [{
    ftype:'grouping',
    groupHeaderTpl: '{name}',
    collapsible: false
  }],

  bind: {
    store: '{recentTasks}'
  }

});
