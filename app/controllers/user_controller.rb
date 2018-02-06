class UserController < ApplicationController

  def index
    @users = Task.select(:user_id, :user_name).order(:user_name).distinct.collect do |u|
      {
        user_id: u.user_id,
        name: u.user_name,
        me: (u.user_id.eql?(current_user.id) rescue false)
      }
    end
    render json: { users: @users, total: @users.length, success: true }
  end


end
