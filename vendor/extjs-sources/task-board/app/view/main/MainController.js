/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('TaskBoard.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  init: function() {
    this.listen({
      store: {
        '#tasks': { load: 'taskStoreLoad' },
        'task-users': { load: 'taskUsersStoreLoad' },
      },
      component: {
        'list-tasks': { filterchange: 'updateGridTitles' }
      }
    });

    // update store every minute
    var runner = new Ext.util.TaskRunner();
    runner.start({
      run: function() {
        Ext.getStore('tasks').load();
      },
      interval: 120000
    });

  },

  listTasksEvent: function(g) {
    this.updateGridTitles();
  },

  updateGridTitle: function(g) {
    if (!g.header) {
      // console.log('no header in grid', g);
      return;
    }
    g.setTitle(new Ext.XTemplate('{title} ({count})').apply({
      title: g.header.config.title.text,
      count: g.store.getTotalCount() 
    }));
  },

  updateGridTitles: function() {
    // console.log('updateGridTitles');
    var grids = Ext.ComponentQuery.query('list-tasks');
    Ext.Array.each(grids, function(grid) {
      this.updateGridTitle(grid);
    }, this);
  },

  reloadTaskStore: function() {
    var store = Ext.getStore('tasks');
    store.load();
  },

  taskStoreLoad: function(store) {
    var user = store.getProxy().reader.metaData.user;
    var tpl = new Ext.Template('Tasks für Benutzer: {name}');
    Ext.Array.each(Ext.ComponentQuery.query('task-user-info'), function(info) {
      info.setHtml(tpl.apply(user));
    });
    this.updateGridTitles();
  },

  taskUsersStoreLoad: function(store) {
    var selector = Ext.ComponentQuery.query('task-userselector')[0];
    if (selector) {
      var meUser = store.findRecord('me', true);
      selector.setValue(meUser.get('user_id'));
    }
    var selector = Ext.ComponentQuery.query('task-userselector-grid')[0];
    if (selector) {
      var meUser = store.findRecord('me', true);
      if (selector.select) selector.select(meUser);
      if (selector.setSelection) selector.setSelection(meUser);
    }
  },

  taskUserSelectorSelect: function(grid, records) {
    var record = records[0] || records;
    if (!record) return;
    var newValue = record.get('user_id');
    var store = Ext.getStore('tasks');
    if (!store) {
      return;
    }
    store.getProxy().extraParams.user_id = newValue;
    store.load();
  },

  taskUserSelectorChange: function(combo, newValue, oldValue) {
    var store = Ext.getStore('tasks');
    if (!store) {
      // console.log('taskUserSelectorChange could not find store');
      return;
    }
    store.getProxy().extraParams.user_id = newValue;
    store.load();
  },

  backlogTaskSorter: function(item, checked) {
    this.taskSorter(item, checked, 'backlog-tasks-store');
  },

  openTaskSorter: function(item, checked) {
    this.taskSorter(item, checked, 'open-tasks-store');
  },

  taskSorter: function(item, checked, storeId) {
    if (!checked) return;
    var store = Ext.getStore(storeId);
    var value = item.value||item.config.value;
    var sorters = {
      'date': [{ property: 'deadline_at', direction: 'ASC' }, { property: 'updated_at', direction: 'ASC' }],
      'cweek': [{ property: 'cweek', direction: 'ASC' }],
      'latest': [{ property: 'updated_at', direction: 'ASC' }],
      'title': [{ property: 'title', direction: 'ASC' }],
      'id': [{ property: 'reference', direction: 'ASC' }],
      'type': [{ property: 'task_type', direction: 'ASC' }]
    };
    var sorter = sorters[value];
    store.sort(sorter);
    item.parentMenu.hide(true);
  },

  filterKeypress: function(field, storeId) {
    var store = Ext.getStore(storeId);
    var value = field.getValue();
    var filters = store.getFilters();
    filters.remove('textFilter');

    if (value.length) {
      var textFilter = new Ext.util.Filter({
        id: 'textFilter',
        filterFn: function(record) {
          var compare = [
            record.get('reference'),
            record.get('title'),
          ];
          if (record.get('cweek') > 0) {
            compare.push('KW'+record.get('cweek'));
            compare.push('KW '+record.get('cweek'));
          }
          compare.push({
              'TODO': 'Aufgabe',
              'CUSTOMERTASK': 'Kundenaufgabe',
              'PRODUCTCONCEPT': 'Konzeption',
              'PRODUCTDEV': 'Entwicklung',
              'PRODUCTPLAN': 'Sprint Backlog',
              'PRODUCTQS': 'Prüfung Umsetzung',
              'QS': 'Prüfung HelpDesk',
              'SUPPORT': 'Support'
            }[record.get('task_type')]);
          if (compare.join(' ').toLowerCase().match(value.toLowerCase())) return true;
          return false;
        }
      });
      filters.add(textFilter);
    } else {
      store.removeFilter('textFilter');
    }
  },

  backlogFilterKeypress: function(field) {
    this.filterKeypress(field, 'backlog-tasks-store')
  },

  taskFilterKeypress: function(field) {
    this.filterKeypress(field, 'open-tasks-store')
  },

  clearTextFilter: function(field, storeId) {
    field.reset();
    var store = Ext.getStore(storeId);
    store.removeFilter('textFilter');
  },

  clearBacklogFilter: function(field) {
    this.clearTextFilter(field, 'backlog-tasks-store');
  },

  clearTaskFilter: function(field) {
    this.clearTextFilter(field, 'open-tasks-store');
  },

  taskActionClick: function(view, rowIndex, colIndex, item, e, record, row) {
    record.set('action', item.action);
    record.save({
      failure: function(record, op) {
        alert('Error updating task!');
      },
      success: function(record, op) {
        record.store.load();
      }
    });
  },

  taskItemDoubleTap: function(grid, index, target, record, e, opts) {
    return this.taskItemTapHold(grid, index, target, record, e, opts);
  },

  taskItemTapHold: function(grid, index, target, record, e, opts) {
    Ext.Array.each(Ext.ComponentQuery.query('grid'), function(g) {
      g.deselectAll();
    });
    if (!record.get('own_task')) return;
    grid.select(record);
    var menu = Ext.create('TaskBoard.view.main.TaskMenu', { 
      controller: 'main', 
      meta: { grid: grid, record: record }
    });
    menu.items.each(function(item) {
      switch(item.action) {
        case 'kick':
          //
          var disabled = false;
          if (record.get('status')<100) disabled = true;
          if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
        case 'done':
          //
          var disabled = false;
          if (record.get('status')!=100) disabled = true;
          if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
        case 'start':
          //
          var disabled = false;
          if (record.get('status')==100) disabled = true;
          // if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
        case 'pause':
          //
          var disabled = false;
          if (record.get('status')!=100) disabled = true;
          if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
        case 'next':
          //
          var disabled = false;
          if (Ext.Array.contains([100,200,300], record.get('status'))) disabled = true;
          if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
        case 'later':
          //
          var disabled = false;
          if (Ext.Array.contains([100,200,400], record.get('status'))) disabled = true;
          if (record.get('archived')==true) disabled = true;
          item.setDisabled(disabled);
          break;
      }
    });
    Ext.Viewport.setMenu(menu, {
      side: 'right'
    });
    Ext.Viewport.showMenu('right');
  },

  taskActionMenu: function(item, event) {
    var record = item.parentMenu.meta.record;
    record.set('action', item.action);
    record.save({
      failure: function(record, op) {
        alert('Error updating task!');
      },
      success: function(record, op) {
        var store = Ext.getStore('tasks');
        store.load();
      }
    });
  },

  onItemSelected: function (sender, record) {
    Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
  },

  onConfirm: function (choice) {
      if (choice === 'yes') {
          //
      }
  }
});
