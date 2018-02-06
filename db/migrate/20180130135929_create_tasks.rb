class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.integer  :user_id
      t.string   :user_name
      t.string   :user_initials, limit: 4
      t.string   :release, limit: 255
      t.string   :reference
      t.string   :title, limit: 4000
      t.integer  :cweek
      t.datetime :deadline_at
      t.integer  :task_id
      t.string   :task_type
      t.string   :phase
      t.integer  :status
      t.float    :hours
      t.string   :url, limit: 4000
      t.string   :target, limit: 255
      t.datetime :modified_at
      t.boolean  :archived
      t.timestamps
    end
  end
end
