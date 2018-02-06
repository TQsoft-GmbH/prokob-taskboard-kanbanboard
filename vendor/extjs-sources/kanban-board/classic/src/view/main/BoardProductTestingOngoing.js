/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductTestingOngoing', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-testing-ongoing',
  userCls: 'kanban-board-product-testing-ongoing',

  bind: {
    store: '{productTestingOngoingTasks}'
  },

  title: 'Ongoing'

});
