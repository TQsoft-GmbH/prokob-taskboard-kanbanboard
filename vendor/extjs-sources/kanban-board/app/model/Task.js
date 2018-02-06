Ext.define('KanbanBoard.model.Task', {
  extend: 'KanbanBoard.model.Base',

  fields: [
      { name: 'user_id', type: 'int' },
      { name: 'user_image_id', type: 'int' },
      { name: 'user_name', type: 'string',
        convert: function(value, record) {
          var user_count = record.get('user_count');
          if (user_count>1) return 'multiple';
          return value;
        }
      },
      { name: 'user_initials', type: 'string',
        convert: function(value, record) {
          var user_count = record.get('user_count');
          if (user_count>1) return '?';
          return value;
        }
      },
      { name: 'user_count', type: 'int' },
      { name: 'release', type: 'string' },
      { name: 'own_task', type: 'bool', defaultValue: false },
      { name: 'reference', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'week', type: 'date' },
      { name: 'deadline_at', type: 'date' },
      { name: 'cweek', type: 'int' },
      { name: 'overdue', type: 'int' },
      { name: 'task_id', type: 'int' },
      { name: 'task_type', type: 'string' },
      { name: 'phase', type: 'string' },
      { name: 'status', type: 'int' },
      { name: 'hours', type: 'int' },
      { name: 'action', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'target', type: 'string' },
      { name: 'modified_at', type: 'date' },
      { name: 'archived', type: 'bool', defaultValue: false },
      { name: 'get_days', type: 'int', 
        convert: function(value, record) {
          var total_hours = record.get('hours');
          var hours = (total_hours % 8);
          var days = (total_hours - hours)/8;
          return days;
        }
      },
      { name: 'get_hours', type: 'int', 
        convert: function(value, record) {
          var total_hours = record.get('hours');
          var hours = (total_hours % 8);
          return hours;
        }
      }
  ],

  /**
  * @property {Object} proxy
  * The REST proxy definition for this model.
  */
  proxy: {
    type: 'rest',
    url : '/kanban',
    // paramsAsJson: true,

    reader: {
      type: 'json',
      rootProperty: 'tasks',
      metaProperty: 'meta'
    },

    writer: {
      writeAllFields: false,
      rootProperty: 'task'
    }

  }

});
