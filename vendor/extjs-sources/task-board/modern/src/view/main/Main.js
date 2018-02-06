/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('TaskBoard.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    // requires: [
    //   'Ext.Menu'
    // ],
    // layout: 'fit',
    // height: '100%',

    controller: 'main',
    viewModel: 'main',
    scrollable: false,

    defaults: {
        scrollable: true,
        tab: {
            iconAlign: 'top'
        },
        padding: '20 20 20 20'
    },

    tabBarPosition: 'top',

    items: [{
        title: 'Aktuell',
        iconCls: 'fa-home',
        items: [{
          xtype: 'task-user-info'
        }, {
          xtype: 'list-current-tasks'
        }, {
          xtype: 'list-paused-tasks'
        }, {
          xtype: 'list-next-tasks'
        }, {
          xtype: 'list-later-tasks'
        }]
    }, {
        title: 'Offen',
        scrollable: 'vertical',
        iconCls: 'fa-tasks',
        items: [{
          xtype: 'toolbar',
          docked: 'top',
          items: [{
            xtype: 'textfield',
            placeholder: 'Filter',
            emptyText: 'Filter',
            enableKeyEvents: true,
            listeners: {
              keyup: 'taskFilterKeypress',
              change: 'taskFilterKeypress',
              clearicontap: 'clearTaskFilter'
            },
            width: 180,
          }, {
            margin: '0 0 0 5',
            text: 'Sortierung',
            name: 'sorter',
            menu: {
              defaults: {
                xtype: 'menuradioitem',
                group: 'open-task-sorter',
                listeners: { checkchange: 'openTaskSorter' }
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
          }]
        }, {
          xtype: 'task-user-info'
        }, {
          xtype: 'list-open-tasks'
        }]
    }, {
        title: 'Backlog',
        scrollable: 'vertical',
        iconCls: 'fa-archive',
        items: [{
          xtype: 'toolbar',
          docked: 'top',
          items: [{
            xtype: 'textfield',
            placeholder: 'Filter',
            emptyText: 'Filter',
            enableKeyEvents: true,
            listeners: {
              keyup: 'backlogFilterKeypress',
              change: 'backlogFilterKeypress',
              clearicontap: 'clearBacklogFilter'
            },
            width: 180,
          }, {
            margin: '0 0 0 5',
            text: 'Sortierung',
            name: 'sorter',
            menu: {
              defaults: {
                xtype: 'menuradioitem',
                group: 'backlog-task-sorter',
                listeners: { checkchange: 'backlogTaskSorter' }
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
          }]
        }, {
          xtype: 'task-user-info'
        }, {
          xtype: 'list-backlog-tasks'
        }]
    }, {
        title: 'Kürzlich',
        scrollable: 'vertical',
        iconCls: 'fa-clock-o',
        items: [{
          xtype: 'task-user-info'
        }, {
          xtype: 'list-recent-tasks'
        }]
    }, {
      title: 'Benutzer',
      iconCls: 'fa-users',
      items: [{
        xtype: 'task-user-info'
      }, {
        xtype: 'task-userselector-grid',
        listeners: {
          select: 'taskUserSelectorSelect'
        }
      }]
    }]
});
