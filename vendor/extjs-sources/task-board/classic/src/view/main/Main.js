/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TaskBoard.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'TaskBoard.view.main.MainController',
        'TaskBoard.view.main.MainModel',
        'TaskBoard.view.main.ListTasks',
        'TaskBoard.view.main.ListOpenTasks'
        // ,'TaskBoard.view.main.ListNextTasks'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Aktuell',
        iconCls: 'fa-home',
        scrollable: 'vertical',
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
          xtype: 'task-user-info'
        }, {
          xtype: 'list-open-tasks'
        }]
    }, {
        title: 'Backlog',
        scrollable: 'vertical',
        iconCls: 'fa-archive',
        items: [{
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
