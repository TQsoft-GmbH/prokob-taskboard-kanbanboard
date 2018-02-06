/**
* This view is an example list of people.
*/
Ext.define('TaskBoard.view.main.Board', {
  extend: 'Ext.view.View',

  xtype: 'kanban-board',
  componentCls: 'kanban-board',

  loadMask: false,
  scrollable: false,

  title: 'untitled',

  itemSelector: 'div.kanban-board-task',

  headerStyle: '',
  maxItems: 6,

  /**
   * @method initComponent
   * @inheritdoc
   * @return {void}
   */
  initComponent: function() {
    this.tpl = Ext.Array.clone(this.tpl); // required or the template will be rendered in the superclass' context
    this.callParent(arguments);
  },

  headerTpl: [
    '<div class="kanban-board-header {cls}-header" style="{headerStyle}">',
      '<div class="kanban-board-header-text">{title} <span class="kanban-board-header-count">({count})</span></div>',
    '</div>'
  ],

  tpl: [
    '{[this.renderHeader(values)]}',
    '<div class="kanban-board-tasks-outer">',
      '<div class="kanban-board-tasks-inner">',
        '{% OVERFLOW = {} %}',
        '<tpl for=".">',
          '<tpl if="xindex &lt;= this.owner.maxItems">', /* only show maxItems */
            '<a href="{url}" target="{target}" class="kanban-board-task-user-{user_id}">',
              '<div class="kanban-board-task-container-outer" title="{title:htmlEncode}">',
                '<div class="kanban-board-task-container" title="{title:htmlEncode}" style="background-color:{[this.stringToHSL(this.getUserName(values))]}">',
                  '<div class="kanban-board-task">',
                    '<div class="kanban-board-task-row-1">',
                      '<div class="kanban-board-task-reference">{reference}</div>',
                      '<div class="kanban-board-task-user-image-container" title="{[this.getUserName(values)]}">',
                        '<div class="kanban-board-task-user-initials">{[this.getUserInitals(values)]}</div>',
                      '</div>',
                    '</div>',
                    '<div class="kanban-board-task-row-2">',
                      '<div class="kanban-board-task-target-release">{release}</div>',
                      '<div class="kanban-board-task-cweek"><tpl if="cweek &gt; 0">KW{cweek}</tpl></div>',
                      '<div class="kanban-board-task-hours"><tpl if="hours &gt; 0">{hours}h</tpl></div>',
                    '</div>',
                  '</div>',
                '</div>',
              '</div>',
            '</a>',
          '<tpl else>',
            '{% OVERFLOW[this.getUserId(values)] = OVERFLOW[this.getUserId(values)]||{ user_id: this.getUserId(values), user_name: this.getUserName(values), user_initials: this.getUserInitals(values), color:null, tasks:[] } %}',
            '{% OVERFLOW[this.getUserId(values)].color = this.stringToHSL(this.getUserName(values)) %}',
            '{% OVERFLOW[this.getUserId(values)].tasks.push(values) %}',
          '</tpl>',
        '</tpl>',


        '{% HOURS = 0; WITH_HOURS = 0 %}',
        '<tpl for=".">',
          '<tpl if="xindex &gt; this.owner.maxItems">',
            '{% HOURS+= values.hours %}',
            '{% if (values.hours>0) WITH_HOURS++ %}',
          '</tpl>',
        '</tpl>',

        '{% LENGTH = values.length; MAX_ITEMS = this.owner.maxItems %}',

        '<tpl if="(LENGTH &gt; MAX_ITEMS)">',
          '<div class="kanban-board-tasks-further-container">',
            '{[this.renderOverflow(OVERFLOW)]}',
            // '<div class="kanban-board-tasks-further">',
            //   '{[LENGTH-MAX_ITEMS]} {[(LENGTH-MAX_ITEMS) > 1 ? "weitere" : "weiterer"]}',
            //   '<tpl if="HOURS &gt; 0">',
            //     ' / {[HOURS]}h ({[WITH_HOURS]})',
            //   '</tpl>',
            // '</div>',
          '</div>',
        '</tpl>',

      '</div>',
    '</div>', {
      getUserName: function(values) {
        if (values.user_count > 1) return '';
        return values.user_name;
      },
      getUserId: function(values) {
        if (values.user_count > 1) return 0;
        return values.user_id;
      },
      getUserInitals: function(values) {
        if (values.user_count > 1) return '';
        return values.user_initials;
      },
      renderHeader: function(values) {
        // console.log('renderHeader', this.owner);
        return new Ext.XTemplate(this.owner.headerTpl).apply({
          title:this.owner.title,
          cls:this.owner.userCls,
          headerStyle:this.owner.headerStyle,
          count: values.length
        });
      },
      renderOverflow: function(overflow) {
        var html = [];
        for (var user in overflow) {
          var values = overflow[user];
          html.push('<div class="kanban-board-task-overflow kanban-board-task-user-'+values.user_id+'" title="'+values.user_name+'" style="background-color:'+values.color+'">');
            html.push('<div class="kanban-board-task-overflow-count">'+values.tasks.length+'</div>');
            html.push('<ul class="kanban-board-task-overflow-list">');
            Ext.Array.each(values.tasks, function(task) {
              html.push('<li>');
                html.push('<a href="'+task.url+'" target="'+task.target+'" title="'+task.title+'">');
                  html.push(task.reference);
                html.push('</a>');
              html.push('</li>');
            });
            html.push('</ul>');
          html.push('</div>');
        }
        if (html.length > 0) {
          return '<div class="kanban-board-task-overflows">'+html.join('')+'</div>';
        } else {
          return '';
        }
      },
      /* Turns a string into a color.
       * @param that {String} a String that will be converted into a hsla color
       * @return {String} hsla color
       */
      stringToHSL: function(that, opts) {
        if (that == '') return 'rgba(200,200,200, .5)';
        var stringHashed = function(that) {
          var hash = 0;
          var str = that;
          var hex = '';
          for (var i=0;i<str.length;i++) {
            hex += ''+str.charCodeAt(i).toString(16);
          }
          str = hex.split('').sort().join(''); // randomize a bit
          if (str.length == 0) return hash;
          for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Convert to 32bit integer
          }
          return hash;
        };

        var intToHSL = function(that, opts) {
          var step = 20;
          var option = opts || {};
          var alpha = option.alpha || .6;
          var l = option.lightness || '70%';
          var h = Math.abs(that % 360);
          h = Math.round(h/step, 0)*step;
          var s = Math.abs(that % 50)+50;
          s = Math.round(s/step, 0)*step;
          s = s+'%';
          return "hsla("+h+","+s+","+l+","+alpha+")";
        };
        return intToHSL(stringHashed(that), opts);
      }
    }
  ]

});
