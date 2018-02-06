/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductConceptDone', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-concept-done',
  userCls: 'kanban-board-product-concept-done',

  bind: {
    store: '{productConceptDoneTasks}'
  },

  title: 'Done'

});
