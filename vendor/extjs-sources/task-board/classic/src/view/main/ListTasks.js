/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.ListTasks', {
  extend: 'Ext.grid.Panel',

  xtype: 'list-tasks',

  requires: [
    'TaskBoard.store.Tasks'
  ],

  title: 'List Tasks',

  // hideHeaders: true,

  componentCls: 'task-list',

  tools:[{
    type:'refresh',
    tooltip: 'Reload',
    handler: 'reloadTaskStore'
  }],

  sortableColumns: false,
  enableColumnMove: false,

  columns: [
    { flex: 10, cellWrap: true, renderer: function(value, meta, record) { return this.columnRenderer(value, meta, record) } },
    { xtype: 'list-task-action-column' }
  ],

  columnRenderer: function(value, meta, record) {
    var tpl = new Ext.XTemplate(
      '<span class="task-title">',
        '<tpl if="url">',
          '<a href="{url}" target="{[values.target||\"_blank\"]}">{reference}</a> ',
        '<tpl else>',
          '{reference} ',
        '</tpl>',
        '<span class="task-type task-type-wrapped">',
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
        '</span>',
        '{title}',
      '</span>',
      '<tpl if="deadline_at||hours||cweek">',
        '<br />',
        '<span class="task-load<tpl if="overdue"> task-overdue</tpl>">',
          '<tpl if="deadline_at">',
            'Deadline {[Ext.util.Format.date(values.deadline_at, "d.m.Y")]}',
            '<tpl if="cweek">',
              ' / ',
            '</tpl>',
          '</tpl>',
          '<tpl if="cweek">',
            'Geplant für KW {cweek}',
            '<tpl if="hours">',
              ' / ',
            '</tpl>',
          '</tpl>',
          '<tpl if="hours">',
            '<span class="task-load-time">',
              'Geschätzter Aufwand: {[values.formatted_hours]} {[ values.hours == 1 ? "Stunde" : "Stunden" ]}',
            // '<tpl if="get_days&gt;0">',
            //   '{[values.get_days]} {[ values.get_days == 1 ? "Tag" : "Tage" ]} ',
            // '</tpl>',
            // '<tpl if="get_hours&gt;0">',
            //   '{[values.get_hours]} {[ values.get_hours == 1 ? "Stunde" : "Stunden" ]}',
            // '</tpl>',
            '</span>',
          '</tpl>',
        '</span>',
      '</tpl>'
    );
    var html = tpl.apply(record.data);
    return html;
  }

});
