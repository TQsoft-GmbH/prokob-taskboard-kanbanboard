/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductDevelopmentOngoing', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-development-ongoing',
  userCls: 'kanban-board-product-development-ongoing',

  bind: {
    store: '{productDevelopmentOngoingTasks}'
  },

  title: 'Ongoing'

});
