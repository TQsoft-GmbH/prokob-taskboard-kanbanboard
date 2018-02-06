Ext.define('TaskBoard.view.main.ListTaskActionColumn', {
  extend: 'Ext.grid.column.Action',

  xtype: 'list-task-action-column',
  width: 150,
  align: 'right',
  items: [{
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (record.get('status')<100) disabled = true;
      if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-times',
    tooltip: 'Kick',
    action: 'kick',
    handler: 'taskActionClick'
  }, {
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (record.get('status')!=100) disabled = true;
      if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-check',
    tooltip: 'Fertig',
    action: 'done',
    handler: 'taskActionClick'
  }, {
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (record.get('status')==100) disabled = true;
      // if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-play',
    tooltip: 'Starten',
    action: 'start',
    handler: 'taskActionClick'
  }, {
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (record.get('status')!=100) disabled = true;
      if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-pause',
    tooltip: 'Pausieren',
    action: 'pause',
    handler: 'taskActionClick'
  }, {
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (Ext.Array.contains([100,200,300], record.get('status'))) disabled = true;
      if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-forward',
    tooltip: 'Als Nächstes',
    action: 'next',
    handler: 'taskActionClick'
  }, {
    isActionDisabled: function(view, rowIndex, colIndex, item, record) {
      var disabled = false;
      if (!record.get('own_task')) disabled = true;
      if (Ext.Array.contains([100,200,400], record.get('status'))) disabled = true;
      if (record.get('archived')==true) disabled = true;
      return disabled;
    },
    iconCls: 'x-fa fa-level-down',
    tooltip: 'Später',
    action: 'later',
    handler: 'taskActionClick'
  }]

});
