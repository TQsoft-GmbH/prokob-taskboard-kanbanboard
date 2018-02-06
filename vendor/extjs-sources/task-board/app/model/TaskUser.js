Ext.define('TaskBoard.model.TaskUser', {
  extend: 'TaskBoard.model.Base',

  fields: [
      { name: 'user_id', type: 'int' },
      { name: 'name', type: 'string' },
      { name: 'me', type: 'bool' }
  ],

  /**
  * @property {Object} proxy
  * The REST proxy definition for this model.
  */
  proxy: {
    type: 'rest',
    url : '/user',
    // paramsAsJson: true,

    reader: {
      type: 'json',
      rootProperty: 'users'
    }

  }


});
