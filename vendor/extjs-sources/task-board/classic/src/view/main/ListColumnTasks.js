/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListColumnTasks', {
  extend: 'TaskBoard.view.main.ListTasks',

  xtype: 'list-column-tasks',

  componentCls: 'task-list task-column-list',

  hideHeaders: false,
  sortableColumns: true,
  enableColumnMove: false,

  columns: [
    { width: 75, cellWrap: true, dataIndex:'id', text: 'ID', renderer: function(value, meta, record) { return this.columnReferenceRenderer(value, meta, record) } },
    { width: 125, cellWrap: true, dataIndex:'task_type', text: 'Typ', renderer: function(value, meta, record) { return this.columnTaskTypeRenderer(value, meta, record) } },
    { flex: 10, cellWrap: true, dataIndex:'title', text: 'Titel', renderer: function(value, meta, record) { return this.columnTitleRenderer(value, meta, record) } },
    { width: 105, cellWrap: true, dataIndex:'cweek', text:'KW', renderer: function(value, meta, record) { return this.columnCweekRenderer(value, meta, record) } },
    { width: 85, cellWrap: true, dataIndex:'deadline_at', text: 'Deadline', renderer: function(value, meta, record) { return this.columnDeadlineRenderer(value, meta, record) } },

    { xtype: 'list-task-action-column', text: 'Aktionen' }
  ],

  columnReferenceRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<span class="task-title">',
        '<tpl if="url">',
          '<a href="{url}" target="{[values.target||\"_blank\"]}">{reference}</a> ',
        '<tpl else>',
          '{reference} ',
        '</tpl>',
      '</span>'
    );
    var html = tpl.apply(record.data);
    return html;
  },

  columnTaskTypeRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<span class="task-type">',
        '<tpl if="task_type==\'TODO\'">',
          'Aufgabe',
        '<tpl elseif="task_type==\'CUSTOMERTASK\'">',
          'Kundenaufgabe',
        '<tpl elseif="task_type==\'PRODUCTCONCEPT\'">',
          'Konzeption',
        '<tpl elseif="task_type==\'PRODUCTDEV\'">',
          'Entwicklung',
        '<tpl elseif="task_type==\'PRODUCTPLAN\'">',
          'Sprint Backlog',
        '<tpl elseif="task_type==\'PRODUCTQS\'">',
          'Prüfung Umsetzung',
        '<tpl elseif="task_type==\'QS\'">',
          'Prüfung HelpDesk',
        '<tpl elseif="task_type==\'SUPPORT\'">',
          'Support',
        '</tpl>',
      '</span>'
    );
    var html = tpl.apply(record.data);
    return html;
  },

  columnTitleRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<span class="task-title">',
        '{title}',
      '</span>'
    );
    var html = tpl.apply(record.data);
    return html;
  },

  columnCweekRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<tpl if="hours||cweek">',
        '<span class="task-load<tpl if="overdue"> task-overdue</tpl>">',
          '<tpl if="cweek">',
            '{cweek}',
            '<tpl if="hours">',
              '<br />',
            '</tpl>',
          '</tpl>',
          '<tpl if="hours">',
            '<span class="task-load-time">',
              '{[values.formatted_hours]} {[ values.hours == 1 ? "Stunde" : "Stunden" ]}',
            '</span>',
          '</tpl>',
        '</span>',
      '</tpl>'
    );
    var html = tpl.apply(record.data);
    return html;
  },

  columnDeadlineRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<tpl if="deadline_at">',
        '<span class="task-load<tpl if="overdue"> task-overdue</tpl>">',
          '<tpl if="deadline_at">',
            '{[Ext.util.Format.date(values.deadline_at, "d.m.Y")]}',
          '</tpl>',
        '</span>',
      '</tpl>'
    );
    var html = tpl.apply(record.data);
    return html;
  }

});
