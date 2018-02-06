/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('KanbanBoard.view.main.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-main',

  requires: [
    'Ext.plugin.Viewport',
    'Ext.window.MessageBox',

    'KanbanBoard.view.main.MainController',
    'KanbanBoard.view.main.MainModel'
  ],

  controller: 'main',
  viewModel: 'main',


  layout: {
    type: 'table',
    width: 1920,
    columns: 2
  },

  bodyCls: 'kanban-board-main-body',
  bodyStyle: 'padding: 20px 20px 0 20px',
  scrollable: true,

  defaults: {
    layout: 'hbox',
    bodyStyle: 'padding: 0',
    width: 1780,
    height: 325,
    margin: '0 0 20 0'
  },

  bind: {
    title: '{title}'
  },

  items: [{
    layout: 'auto',
    html: 'Produkt',
    userCls: 'kanban-board-row-title kanban-board-product',
    bodyCls: 'kanban-board-body',
    width: 80
  }, {
    userCls: 'kanban-board-row kanban-board-product',
    bodyCls: 'kanban-board-body',
    items: [{
      xtype: 'kanban-board-product-todo',
      flex: 3,
      height: 335
    }, {
      xtype: 'container',
      flex: 6,
      layout: {
        type: 'table',
        tableAttrs: { width: '100%' },
        tdAttrs: { width: '50%', valign: 'top' },
        columns: 2
      },
      items: [{
        xtype: 'component',
        componentCls: 'kanban-board',
        html: '<div class="kanban-board-header" style="height:100%"><div class="kanban-board-header-text">Konzeption</div></div>',
        colspan: 2,
        height: 30
      }, {
        xtype: 'kanban-board-product-concept-ongoing',
        headerStyle: 'height:30px',
        height: 305
      }, {
        xtype: 'kanban-board-product-concept-done',
        headerStyle: 'height:30px',
        columnWidth: 0.5,
        height: 305
      }]
    }, {
      xtype: 'container',
      flex: 6,
      layout: {
        type: 'table',
        tableAttrs: { width: '100%' },
        tdAttrs: { width: '50%', valign: 'top' },
        columns: 2
      },
      items: [{
        xtype: 'component',
        componentCls: 'kanban-board',
        html: '<div class="kanban-board-header" style="height:100%"><div class="kanban-board-header-text">Entwicklung</div></div>',
        colspan: 2,
        height: 30
      }, {
        xtype: 'kanban-board-product-development-ongoing',
        headerStyle: 'height:30px',
        height: 305
      }, {
        xtype: 'kanban-board-product-development-done',
        headerStyle: 'height:30px',
        height: 305
      }]
    }, {
      xtype: 'container',
      flex: 6,
      layout: {
        type: 'table',
        tableAttrs: { width: '100%' },
        tdAttrs: { width: '50%', valign: 'top' },
        columns: 2
      },
      items: [{
        xtype: 'component',
        componentCls: 'kanban-board',
        html: '<div class="kanban-board-header" style="height:100%"><div class="kanban-board-header-text">Testen</div></div>',
        colspan: 2,
        height: 30,
        flex: 6
      }, {
        xtype: 'kanban-board-product-testing-ongoing',
        headerStyle: 'height:30px',
        height: 305
      }, {
        xtype: 'kanban-board-product-testing-done',
        headerStyle: 'height:30px',
        height: 305
      }]
    }]
  }, {
    layout: 'auto',
    html: 'Projekt',
    xtype: 'panel',
    userCls: 'kanban-board-row-title kanban-board-project',
    bodyCls: 'kanban-board-body',
    width: 80
  }, {
    userCls: 'kanban-board-row kanban-board-project',
    bodyCls: 'kanban-board-body',
    items: [{
      xtype: 'kanban-board-project-todo',
      flex: 3,
      height: 325
    }, {
      xtype: 'kanban-board-project-ongoing',
      flex: 15,
      height: 325
    }, {
      xtype: 'kanban-board-project-done',
      flex: 3,
      height: 325
    }]
  }, {
    layout: 'auto',
    margin: '0 0 0 0',
    html: 'Support',
    xtype: 'panel',
    userCls: 'kanban-board-row-title kanban-board-support',
    bodyCls: 'kanban-board-body',
    width: 80
  }, {
    margin: '0 0 0 0',
    userCls: 'kanban-board-row kanban-board-support',
    bodyCls: 'kanban-board-body',
    items: [{
      xtype: 'kanban-board-support-todo',
      flex: 3,
      height: 325
    }, {
      xtype: 'kanban-board-support-ongoing',
      flex: 7.5,
      height: 325
    }, {
      xtype: 'kanban-board-support-testing',
      flex: 7.5,
      height: 325
    }, {
      xtype: 'kanban-board-support-done',
      flex: 3,
      height: 325
    }]
  }]

});
