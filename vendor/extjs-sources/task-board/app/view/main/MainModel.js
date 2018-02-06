/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('TaskBoard.view.main.MainModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.main',

  stores: {
    tasks: {
      type: 'tasks',
      autoLoad: true,
      storeId: 'tasks'
    },
    openTasks: {
      id: 'open-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      sorters: [{ property: 'deadline_at', direction: 'ASC' }, { property: 'updated_at', direction: 'ASC' }],
      filters: [{
        id: 'openTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.archived) return false;
          if (record.data.task_type=='PRODUCTPLAN') return false;
          return !record.data.status > 0;
        }
      }]
    },
    backlogTasks: {
      id: 'backlog-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'backlogTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.archived) return false;
          if (record.data.task_type!='PRODUCTPLAN') return false;
          return !record.data.status > 0;
        }
      }]
    },
    recentTasks: {
      id: 'recent-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      grouper: Ext.create('Ext.util.Grouper', {
        sortProperty: 'updated_at',
        direction: 'DESC',
        groupFn: function(record) {
          var todaysDate = new Date();
          var yesterdaysDate = new Date(todaysDate-24*60*60*1000);
          var twoDaysAgoDate = new Date(todaysDate-24*60*60*1000*2);
          var recordsDate = new Date(record.get('updated_at'));
          var name = '';
          if (todaysDate.setHours(0,0,0,0) == recordsDate.setHours(0,0,0,0)) name = 'heute';
          if (yesterdaysDate.setHours(0,0,0,0) == recordsDate.setHours(0,0,0,0)) name = 'gestern';
          if (twoDaysAgoDate.setHours(0,0,0,0) == recordsDate.setHours(0,0,0,0)) name = 'vorgestern';
          return name += '<span class="task-group-date">' + Ext.Date.format(recordsDate, 'd. M Y') + '</span>';
          // return name += ' ' + Ext.Date.format(recordsDate, 'd. M Y') + '';
        }
      }),
      // sorters: [{ property:'updated_at', direction: 'DESC' }],
      filters: [
        function(record) {
          // if (!record.data.archived) return false;
          // if (!record.data.status>0) return false;
          if (!record.data.archived) {
            if (record.data.status>200) return false;
          }
          if (!record.data.status>0) return false;
          return true;
        }
      ]
    },
    pausedTasks: {
      id: 'paused-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      filters: [
        function(record) {
          if (record.data.archived) return false;
          return record.data.status == 200;
        }
      ]
    },
    nextTasks: {
      id: 'next-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      filters: [
        function(record) {
          if (record.data.archived) return false;
          return record.data.status == 300;
        }
      ]
    },
    laterTasks: {
      id: 'later-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      filters: [
        function(record) {
          if (record.data.archived) return false;
          return record.data.status == 400;
        }
      ]
    },
    currentTasks: {
      id: 'current-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      filters: [
        function(record) {
          if (record.data.archived) return false;
          return record.data.status == 100;
        }
      ]
    }

  },

  data: {
      name: 'myTaskBoard',

      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

  //TODO - add data, formulas and/or methods to support your view
});
