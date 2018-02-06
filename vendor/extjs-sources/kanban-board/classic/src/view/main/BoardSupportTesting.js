/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardSupportTesting', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-support-testing',
  userCls: 'kanban-board-support-testing',

  bind: {
    store: '{supportTestingTasks}'
  },

  title: 'Testen',
  maxItems: 15

});
