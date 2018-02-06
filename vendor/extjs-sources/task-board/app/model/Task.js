Ext.define('TaskBoard.model.Task', {
  extend: 'TaskBoard.model.Base',

  fields: [
      { name: 'user_id', type: 'int' },
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
      { name: 'hours', type: 'float' },
      { name: 'formatted_hours', mapping: 'hours', 
        convert: function(value, record) {
          var h = record.get('hours');
          var f = parseInt((h%1)*100);
          if (f==0) return h;
          return parseInt(h)+','+f;
        }
      },
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
    url : '/task',
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
