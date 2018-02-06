/**
* 
*/
Ext.define('TaskBoard.view.main.TaskMenu', {
  extend: 'Ext.menu.Menu',
  xtype: 'task-menu',
  componentCls: 'task-menu',
  items: [{
    text: 'Kick',
    iconCls: 'x-fa fa-times',
    action: 'kick',
    handler: 'taskActionMenu'
  }, {
    text: 'Fertig',
    iconCls: 'x-fa fa-check',
    action: 'done',
    handler: 'taskActionMenu'
  }, {
    text: 'Starten',
    iconCls: 'x-fa fa-play',
    action: 'start',
    handler: 'taskActionMenu'
  }, {
    text: 'Pausieren',
    iconCls: 'x-fa fa-pause',
    action: 'pause',
    handler: 'taskActionMenu'
  }, {
    text: 'Als Nächstes',
    iconCls: 'x-fa fa-forward',
    action: 'next',
    handler: 'taskActionMenu'
  }, {
    text: 'Später',
    iconCls: 'x-fa fa-level-down',
    action: 'later',
    handler: 'taskActionMenu'
  }]
});
