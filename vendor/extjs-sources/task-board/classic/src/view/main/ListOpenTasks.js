/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListOpenTasks', {
  extend: 'TaskBoard.view.main.ListColumnTasks',

  requires: [
    'Ext.form.field.Text'
  ],

  xtype: 'list-open-tasks',
  userCls: 'list-open-tasks',

  title: 'Offen',

  tbar: [{
    xtype: 'textfield',
    emptyText: 'Filter',
    enableKeyEvents: true,
    listeners: {
      keyup: 'taskFilterKeypress'
    },
    width: 180,
    triggers: {
      clear: {
        cls: 'x-fa fa-times-circle',
        handler: 'clearTaskFilter'
      }
    }
  }, {
    text: 'Sortierung',
    name: 'sorter',
    menu: {
      defaults: {
        xtype: 'menucheckitem',
        group: 'open-tasks-sorter',
        listeners: { click: 'openTaskSorter' }
      },
      items: [{
        checked: true,
        text: 'Datum',
        value: 'date'
      }, {
        text: 'KW',
        value: 'cweek'
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
    store: '{openTasks}'
  }

});
