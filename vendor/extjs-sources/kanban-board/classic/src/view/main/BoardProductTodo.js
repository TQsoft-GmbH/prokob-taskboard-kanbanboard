/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProductTodo', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-product-todo',
  userCls: 'kanban-board-product-todo',

  bind: {
    store: '{productTodoTasks}'
  },

  title: 'Todos'

});
