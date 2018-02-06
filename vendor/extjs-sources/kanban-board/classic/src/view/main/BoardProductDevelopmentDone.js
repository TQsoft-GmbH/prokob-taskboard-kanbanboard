/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductDevelopmentDone', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-development-done',
  userCls: 'kanban-board-product-development-done',

  bind: {
    store: '{productDevelopmentDoneTasks}'
  },

  title: 'Done'

});
