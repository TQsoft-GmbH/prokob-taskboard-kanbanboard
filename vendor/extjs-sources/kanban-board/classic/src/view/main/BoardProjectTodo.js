/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.BoardProjectTodo', {
  extend: 'TaskBoard.view.main.Board',

  xtype: 'kanban-board-project-todo',
  userCls: 'kanban-board-project-todo',

  bind: {
    store: '{projectTodoTasks}'
  },

  title: 'Todos'

});
