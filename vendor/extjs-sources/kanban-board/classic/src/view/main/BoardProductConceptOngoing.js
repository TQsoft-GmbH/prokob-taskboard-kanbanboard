/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductConceptOngoing', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-concept-ongoing',
  userCls: 'kanban-board-product-concept-ongoing',

  bind: {
    store: '{productConceptOngoingTasks}'
  },

  title: 'Ongoing'

});
