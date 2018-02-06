/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('KanbanBoard.view.main.MainModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.main',

  stores: {
    tasks: {
      type: 'tasks',
      autoLoad: true,
      storeId: 'tasks'
    },
    productTodoTasks: {
      id: 'product-todo-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productTodoTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Todo') return true;
          return false;
        }
      }]
    },
    productConceptOngoingTasks: {
      id: 'product-concept-ongoing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productConceptOngoingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Concept.Ongoing') return true;
          return false;
        }
      }]
    },
    productConceptDoneTasks: {
      id: 'product-concept-done-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productConceptDoneTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Concept.Done') return true;
          return false;
        }
      }]
    },
    productDevelopmentOngoingTasks: {
      id: 'product-development-ongoing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productDevelopmentOngoingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Develop.Ongoing') return true;
          return false;
        }
      }]
    },
    productDevelopmentDoneTasks: {
      id: 'product-development-done-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productDevelopmentDoneTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Develop.Done') return true;
          return false;
        }
      }]
    },
    productTestingOngoingTasks: {
      id: 'product-testing-ongoing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productTestingOngoingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Test.Ongoing') return true;
          return false;
        }
      }]
    },
    productTestingDoneTasks: {
      id: 'product-testing-done-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'productTestingDoneTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Development.Test.Done') return true;
          return false;
        }
      }]
    },
    projectTodoTasks: {
      id: 'project-todo-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'projectTodoTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Projekt.Todo') return true;
          return false;
        }
      }]
    },
    projectOngoingTasks: {
      id: 'project-ongoing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'projectOngoingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Projekt.Ongoing') return true;
          return false;
        }
      }]
    },
    projectDoneTasks: {
      id: 'project-done-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'projectDoneTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Projekt.Done') return true;
          return false;
        }
      }]
    },
    supportTodoTasks: {
      id: 'support-todo-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'supportTodoTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Support.Todo') return true;
          return false;
        }
      }]
    },
    supportOngoingTasks: {
      id: 'support-ongoing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'supportOngoingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Support.Ongoing') return true;
          return false;
        }
      }]
    },
    supportTestingTasks: {
      id: 'support-testing-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'supportTestingTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Support.Test') return true;
          return false;
        }
      }]
    },
    supportDoneTasks: {
      id: 'support-done-tasks-store',
      type: 'chained-tasks',
      source: 'tasks',
      remoteSort: false,
      filters: [{
        id: 'supportDoneTasksDefaultFilter',
        filterFn: function(record) {
          if (record.data.phase == 'Support.Done') return true;
          return false;
        }
      }]
    }
  },

  data: {
    title: 'ProKoB Kanban Taskboard',
    loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

});

var randomBool = (function() {
  var a = new Uint8Array(1);
  return function() {
    crypto.getRandomValues(a);
    return a[0] > 127;
  };
})();
