/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductTestingDone', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-testing-done',
  userCls: 'kanban-board-product-testing-done',

  bind: {
    store: '{productTestingDoneTasks}'
  },

  title: 'Done'

});
