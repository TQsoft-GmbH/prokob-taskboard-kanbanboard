/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardSupportOngoing', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-support-ongoing',
  userCls: 'kanban-board-support-ongoing',

  bind: {
    store: '{supportOngoingTasks}'
  },

  title: 'Ongoing',
  maxItems: 15

});
