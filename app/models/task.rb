class Task < ApplicationRecord

  # Possible values for the status column
  OPEN = nil
  STARTED = 100
  PAUSED = 200
  NEXT = 300
  LATER = 400
  DONE = 900
  DELETED = nil

  # AREL Helper to load the tasks for a specific user
  def self.for_user(user)
    where(user_id: user.id).order(:status, deadline_at: :desc, updated_at: :asc)
  end

  # AREL Helper to load this week's tasks for a specific user
  def self.current_for_user(user)
    for_user(user).where('(archived = 1 AND updated_at > :recent) OR (archived = 0)', { recent: 7.days.ago }).order(:status, deadline_at: :desc, updated_at: :asc)
  end

  # Helper Struct
  def self.source_struct
    @@source_struct ||= Struct.new(:user_id, :user_name, :user_initials, :title, :hours, :deadline_at, :cweek, :release, :reference, :task_id, :task_type, :url, :phase, :visible, :changed_at)
  end

  # This is a place holder for demo purposes. Here one would implement the logic for importing
  # data from a project management tool.
  def self.data_source
    query = <<-eos
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Alpha - Documentation' title
  ,12 hours
  ,'2018/06/30' deadline_at
  ,26 cweek
  ,'1.0' release
  ,'#5432' reference
  ,'5432' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5432' url
  ,'Development.Todo' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Alpha - Backend' title
  ,24 hours
  ,'2018/06/20' deadline_at
  ,24 cweek
  ,'1.0' release
  ,'#5431' reference
  ,'5431' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5431' url
  ,'Development.Todo' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  234 user_id
  ,'Gregor Guiman' user_name
  ,'GG' user_initials
  ,'Project Alpha - Backend' title
  ,24 hours
  ,'2018/06/20' deadline_at
  ,24 cweek
  ,'1.0' release
  ,'#5431' reference
  ,'5431' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5431' url
  ,'Development.Todo' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  456 user_id
  ,'Tim Tester' user_name
  ,'TT' user_initials
  ,'Project Beta - Release 2' title
  ,24 hours
  ,'2018/07/30' deadline_at
  ,26 cweek
  ,'2.0' release
  ,'#6920' reference
  ,'6920' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6920' url
  ,'Development.Test.Todo' phase
  ,1 visible
  ,'2018/06/30'changed_at
UNION ALL
SELECT
  754 user_id
  ,'Simone Support' user_name
  ,'SS' user_initials
  ,'Project Beta - Release 2' title
  ,24 hours
  ,'2018/06/02' deadline_at
  ,24 cweek
  ,'2.0' release
  ,'#6920' reference
  ,'6920' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6920' url
  ,'Support.Ongoing' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  876 user_id
  ,'Bibi Backend' user_name
  ,'BB' user_initials
  ,'Project Alpha - Backend Unit Tests' title
  ,24 hours
  ,'2018/06/28' deadline_at
  ,25 cweek
  ,'1.0' release
  ,'#5531' reference
  ,'5531' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5531' url
  ,'Development.Develop.Ongoing' phase
  ,1 visible
  ,'2018/06/02'changed_at
UNION ALL
SELECT
  876 user_id
  ,'Bibi Backend' user_name
  ,'BB' user_initials
  ,'Project Gamma - Backend Unit Tests' title
  ,16 hours
  ,'2018/07/04' deadline_at
  ,27 cweek
  ,'1.0' release
  ,'#5678' reference
  ,'5678' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5678' url
  ,'Development.Concept.Ongoing' phase
  ,1 visible
  ,'2018/06/03'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Gamma - Documentation' title
  ,32 hours
  ,'2018/07/31' deadline_at
  ,29 cweek
  ,'1.0' release
  ,'#5510' reference
  ,'5510' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5510' url
  ,'Development.Concept.Done' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  876 user_id
  ,'Bibi Backend' user_name
  ,'BB' user_initials
  ,'Project Gamma - Backend Controllers' title
  ,8 hours
  ,'2018/07/04' deadline_at
  ,27 cweek
  ,'1.0' release
  ,'#5677' reference
  ,'5677' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5677' url
  ,'Development.Concept.Done' phase
  ,1 visible
  ,'2018/06/03'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Gamma - Backend Middleware' title
  ,32 hours
  ,'2018/07/31' deadline_at
  ,29 cweek
  ,'1.0' release
  ,'#5440' reference
  ,'5440' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5440' url
  ,'Development.Concept.Ongoing' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  456 user_id
  ,'Tim Tester' user_name
  ,'TT' user_initials
  ,'Project Beta - Release 2 Testing Backend' title
  ,4 hours
  ,'2018/07/30' deadline_at
  ,26 cweek
  ,'2.0' release
  ,'#6922' reference
  ,'6922' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6922' url
  ,'Support.Test' phase
  ,1 visible
  ,'2018/06/30'changed_at
UNION ALL
SELECT
  754 user_id
  ,'Simone Support' user_name
  ,'SS' user_initials
  ,'Project Beta - Release 2 UX Problems' title
  ,24 hours
  ,'2018/06/02' deadline_at
  ,24 cweek
  ,'1.5' release
  ,'#6929' reference
  ,'6929' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6929' url
  ,'Support.Done' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  987 user_id
  ,'Paul Project' user_name
  ,'PP' user_initials
  ,'Project Omega - User Stories' title
  ,8 hours
  ,'2018/06/12' deadline_at
  ,23 cweek
  ,'1.0' release
  ,'#3120' reference
  ,'3120' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=3120' url
  ,'Projekt.Todo' phase
  ,1 visible
  ,'2018/06/03'changed_at
UNION ALL
SELECT
  987 user_id
  ,'Paul Project' user_name
  ,'PP' user_initials
  ,'Project Omega - Client Offer for Prototype' title
  ,12 hours
  ,'2018/06/22' deadline_at
  ,24 cweek
  ,'1.0' release
  ,'#3125' reference
  ,'3125' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=3125' url
  ,'Projekt.Ongoing' phase
  ,1 visible
  ,'2018/06/03'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Delta - Customising Importer' title
  ,8 hours
  ,'2018/06/24' deadline_at
  ,25 cweek
  ,'1.0' release
  ,'#6234' reference
  ,'6234' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6234' url
  ,'Projekt.Done' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  456 user_id
  ,'Tim Tester' user_name
  ,'TT' user_initials
  ,'Project Alpha - Verify Customer Bug Report' title
  ,2 hours
  ,'2018/06/29' deadline_at
  ,25 cweek
  ,'1.0' release
  ,'#7088' reference
  ,'7088' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=7088' url
  ,'Support.Todo' phase
  ,1 visible
  ,'2018/06/30'changed_at
UNION ALL
SELECT
  456 user_id
  ,'Tim Tester' user_name
  ,'TT' user_initials
  ,'Product Main - Testing New Component' title
  ,6 hours
  ,'2018/06/24' deadline_at
  ,23 cweek
  ,'1.5' release
  ,'#7089' reference
  ,'7089' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=7089' url
  ,'Development.Test.Ongoing' phase
  ,1 visible
  ,'2018/06/30'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Delta - Excel Parser' title
  ,8 hours
  ,'2018/06/22' deadline_at
  ,24 cweek
  ,'1.0' release
  ,'#6235' reference
  ,'6235' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=6235' url
  ,'Projekt.Ongoing' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  876 user_id
  ,'Bibi Backend' user_name
  ,'BB' user_initials
  ,'Project Alpha - Backend Extension' title
  ,8 hours
  ,'2018/07/04' deadline_at
  ,27 cweek
  ,'1.5' release
  ,'#5533' reference
  ,'5533' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=5533' url
  ,'Projekt.Ongoing' phase
  ,1 visible
  ,'2018/06/03'changed_at
UNION ALL
SELECT
  754 user_id
  ,'Simone Support' user_name
  ,'SS' user_initials
  ,'Project Gamma - Release 2 Printing Issues' title
  ,24 hours
  ,'2018/06/02' deadline_at
  ,24 cweek
  ,'2.0' release
  ,'#1212' reference
  ,'1212' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=1212' url
  ,'Support.Todo' phase
  ,1 visible
  ,'2018/06/01'changed_at
UNION ALL
SELECT
  123 user_id
  ,'Daniel Developer' user_name
  ,'DD' user_initials
  ,'Project Gamma - Frontend API' title
  ,24 hours
  ,'2018/06/20' deadline_at
  ,24 cweek
  ,'1.0' release
  ,'#4420' reference
  ,'4420' task_id
  ,'todo' task_type
  ,'http://external.local/todos/?id=4420' url
  ,'Development.Develop.Done' phase
  ,1 visible
  ,'2018/06/01'changed_at
eos
    ActiveRecord::Base.connection.execute(query).collect do |h| 
      source_struct.new(*h.symbolize_keys.values_at(*source_struct.members))
    end
  end


  # Imports Tasks from a custom data source
  def self.import_tasks!
    tasks_all = data_source
    tasks_all.select{|t|t.visible.to_i.eql?(0)}.each {|data| archive!(data) }
    tasks = tasks_all.select{|t|t.visible.to_i.eql?(1)}
    cleanup!(tasks)
    tasks.each{|data| sync!(data) }
    tasks.length
  end

  # Set archive flag (tasks that are completed)
  def self.archive!(data)
    where(reference: data.reference).update_all(archived: true, phase: data.phase)
    true
  end

  # Make sure tasks that were previously available for specific users and now
  # are only available for different users will be removed from a users MyTaskboard
  def self.cleanup!(tasks)
    references = {}
    tasks.each do |task|
      references[task.reference] ||= []
      references[task.reference] << task.user_id
    end
    # archive all task with references that are no longer available in the data source
    Task.where(status: nil, archived:false).where.not(reference: references.keys).update_all(archived: true)
    # archive all task with the same reference that were assigned to users once before but aren't anymore
    Task.where(reference: references.keys, status: nil).each do |task|
      task.kick! unless references[task.reference].include?(task.user_id)
    end
  end

  # Update task data
  def self.sync!(data)
    task = where(user_id: data.user_id, reference: data.reference).first_or_initialize
    # check if task was already archived
    if task.archived?
      unless task.modified_at.nil? # task was modified by the user once
        if (task.modified_at < data.changed_at) # && task.open?
          # when data is newer re-open the task
          task.archived = false
          task.status = OPEN
        end
      end
    end
    task.attributes = {
      title: ActionController::Base.helpers.strip_tags(data.title),
      task_id: data.task_id,
      task_type: data.task_type,
      cweek: data.cweek,
      user_name: data.user_name,
      user_initials: data.user_initials,
      release: data.release,
      reference: data.reference,
      hours: data.hours,
      deadline_at: data.deadline_at,
      url: data.url,
      archived: data.visible.eql?(0),
      target: '_blank',
      phase: data.phase
    }
    # check if task is now archived and don't care about open tasks
    if task.archived? && !task.status.nil?
      task.status = DONE # set to done
    end
    # Done is always archived
    if !task.archived? && task.done?
      task.archived = true
    end
    task.save
    task
  end

  # Calculate hours overdue
  def overdue
    return nil if self.deadline_at.nil?
    seconds = self.hours.to_i.hours.from_now - self.deadline_at
    hours = seconds/3600
    return nil if hours < 1
    return hours.to_i
  end

  # All attributes to constrcut a record in the frontend
  def constructor(user=nil)
    self.attributes.merge({
      overdue: self.overdue,
      own_task: self.user_id.eql?((user.id rescue nil))
    })
  end

  # Prefixed constructor for the frontend
  def rest_constructor(user=nil)
    {
      task: self.constructor(user)
    }
  end

  # Shortcuts...
  def open?
    self.status.eql?(OPEN)
  end

  def done?
    self.status.eql?(DONE)
  end

  def paused?
    self.status.eql?(PAUSED)
  end

  def next?
    self.status.eql?(NEXT)
  end

  def later?
    self.status.eql?(LATER)
  end

  def start!
    self.class.where(user_id: self.user_id, status: STARTED).update_all(status: PAUSED)
    self.update_attributes(status: STARTED, archived: false, modified_at: Time.now)
  end

  def next!
    self.class.where(user_id: self.user_id, status: NEXT, modified_at: Time.now).update_all(status: LATER)
    self.update_attributes(status: NEXT)
  end

  def pause!
    self.update_attributes(status: PAUSED, modified_at: Time.now)
  end

  def later!
    self.update_attributes(status: LATER, modified_at: Time.now)
  end

  def done!
    self.update_attributes(status: DONE, archived: true, modified_at: Time.now)
  end

  def kick!
    self.update_attributes(status: DELETED, archived: true, modified_at: Time.now)
  end

  def change!(status)
    case status.downcase.to_sym
    when :done
      self.done!
    when :start
      self.start!
    when :pause
      self.pause!
    when :next
      self.next!
    when :later
      self.later!
    when :kick
      self.kick!
    end
    self.status
  end

end
