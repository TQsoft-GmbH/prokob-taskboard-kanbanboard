class KanbanController < ApplicationController

  def index
    @user =  current_user
    getting_tasks = Task.select('DISTINCT *')
      .where(archived: false).or(Task.select('DISTINCT *').where(phase: ['Support.Done','Projekt.Done','Development.Concept.Done'])).where.not(phase: nil)
    @sql = getting_tasks.to_sql
    @tasks = getting_tasks.all.collect{|t| t.constructor(current_user) }
    render json: { meta: {}, total: @tasks.length, tasks: @tasks, success: true, sql: @sql }
  end

end
