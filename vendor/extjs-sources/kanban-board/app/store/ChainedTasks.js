Ext.define('KanbanBoard.store.ChainedTasks', {
  extend: 'Ext.data.ChainedStore',

  requires: [
    'KanbanBoard.store.Tasks'
  ],

  alias: 'store.chained-tasks'
});
