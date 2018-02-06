Ext.grid.RowHeader.override({
    privates: {
        augmentToolHandler: function(tool, args) {
            
            this.callParent([
                tool,
                args
            ]);
            var info = args[1];
            info.grid = info.list;
        },
        getGroupHeaderTplData: function() {
            var data = this.callParent([
                    true
                ]),
                grid = this.parent,
                column = data && grid.getColumnForField(data.groupField);
            if (column) {
                data.columnName = column.getText();
                if (column.printValue) {
                    data.html = column.printValue(data.value);
                }
            } else if (data) {
                // data.html = Ext.htmlEncode(data.name);
                /* i see no need for htmlEncode */
                data.html = data.name;
            }
            return data;
        }
    }
});


/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListRecentTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-recent-tasks',
  userCls: 'list-recent-tasks',

  title: 'Kürzlich',

  bind: {
    store: '{recentTasks}'
  },

  grouped: true

});
