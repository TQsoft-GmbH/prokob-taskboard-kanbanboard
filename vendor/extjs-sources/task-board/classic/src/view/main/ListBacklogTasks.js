/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListBacklogTasks', {
  extend: 'TaskBoard.view.main.ListColumnTasks',

  xtype: 'list-backlog-tasks',
  userCls: 'list-backlog-tasks',

  title: 'Backlog',

  tbar: [{
    xtype: 'textfield',
    emptyText: 'Filter',
    enableKeyEvents: true,
    listeners: {
      keyup: 'backlogFilterKeypress'
    },
    width: 180,
    triggers: {
      clear: {
        cls: 'x-fa fa-times-circle',
        handler: 'clearBacklogFilter'
      }
    }
  }, {
    text: 'Sortierung',
    name: 'sorter',
    menu: {
      defaults: {
        xtype: 'menucheckitem',
        group: 'backlog-tasks-sorter',
        listeners: { click: 'backlogTaskSorter' }
      },
      items: [{
        checked: true,
        text: 'Datum',
        value: 'date'
      }, {
        text: 'Neueste',
        value: 'latest'
      }, {
        text: 'ID',
        value: 'id'
      }, {
        text: 'Titel',
        value: 'title'
      }, {
        text: 'Typ',
        value: 'type'
      }]
    }
  }],

  bind: {
    store: '{backlogTasks}'
  }

});
