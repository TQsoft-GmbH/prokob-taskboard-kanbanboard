Ext.define('TaskBoard.view.main.TaskUserSelector', {
  extend: 'Ext.grid.Grid',

  xtype: 'task-userselector-grid',

  title: 'Benutzer wählen',

  hideHeaders: true,
  infinite: false,
  scrollable: false,
  margin: '0 0 20 0',

  userCls: 'task-userselector',

  store: {
    type: 'task-users',
    autoLoad: true
  },

  columns: [
    { minWidth:'100%',
      autoSize: true,
      dataIndex: 'name',
      text: 'Benutzer',
      cell: {
        xtype: 'gridcell',
        encodeHtml: false
      }
    }
  ]

});