class TaskController < ApplicationController

  # REST view to liest all tasks for the currently logged in user
  # or the selected user from the TaskBoard.
  def index
    if params[:user_id].to_i > 0
      user = User.find(params[:user_id])
      @user = { user_id: user.id, name: user.name }
    else
      @user = { user_id: current_user.id, name: current_user.name } rescue nil
    end
    @tasks = Task.for_user((user||current_user)).limit(1000).collect{|t| t.constructor(current_user) }
    render json: { meta: { user: @user, curr: session[:current_user_id], user_id: current_user.inspect }, total: @tasks.length, tasks: @tasks, success: true }
  end

  # Update a Task in the logged-in user's context
  def update
    @user = current_user
    begin
      @task = Task.for_user(@user).find(params[:id])
      @task.change!(params[:task][:action])
      success = true
      error = nil
    rescue => e
      success = false
      error = e.message
    end
    render json: { task: (@task.constructor rescue nil), success: success, error: error }
  end

  # Soft deletes a task from a user's list by setting the archived flag.
  # The import_tasks scheduled job would restore such a deleted task if this
  # task would still be active in the data source.
  def destroy
    @user = current_user
    begin
      @task = Task.for_user(@user).find(params[:id])
      @task.kick!
      success = true
    rescue => e
      success = false
      error = e.message
    end

    respond_to do |format|
      format.html
      format.json {
        render json: { task => @task.constructor, success: success, error: error }
      }
    end

  end

end
