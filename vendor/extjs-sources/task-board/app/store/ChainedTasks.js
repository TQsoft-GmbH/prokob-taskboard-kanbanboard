Ext.define('TaskBoard.store.ChainedTasks', {
  extend: 'Ext.data.ChainedStore',

  requires: [
    'TaskBoard.store.Tasks'
  ],

  alias: 'store.chained-tasks'
});
