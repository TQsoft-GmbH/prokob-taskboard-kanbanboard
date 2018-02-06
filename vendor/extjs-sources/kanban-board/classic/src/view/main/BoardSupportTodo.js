/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardSupportTodo', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-support-todo',
  userCls: 'kanban-board-support-todo',

  bind: {
    store: '{supportTodoTasks}'
  },

  title: 'Todos'

});
