/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProjectOngoing', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-project-ongoing',
  userCls: 'kanban-board-project-ongoing',

  bind: {
    store: '{projectOngoingTasks}'
  },

  title: 'Ongoing',
  maxItems: 30

});
