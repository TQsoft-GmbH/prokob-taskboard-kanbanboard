/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProjectDone', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-project-done',
  userCls: 'kanban-board-project-done',

  bind: {
    store: '{projectDoneTasks}'
  },

  title: 'Done'

});
