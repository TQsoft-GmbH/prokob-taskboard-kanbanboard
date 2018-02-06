/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardSupportDone', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-support-done',
  userCls: 'kanban-board-support-done',

  bind: {
    store: '{supportDoneTasks}'
  },

  title: 'Done'

});
