class LoginController < ApplicationController

  before_action :authenticate

  def index
    #render plain: "current_user_id: #{session[:current_user_id]} #{current_user.inspect}"
#raise current_user.class.to_s
    redirect_to '/TaskBoard/' if current_user.is_a?(User)
  end


  private
  # Basic auth against local user table
  def authenticate
    authenticate_or_request_with_http_basic("myTaskboard Login") do |email, password|
      user = User.where(email: email, password: password).first rescue nil
      redirect_to controller: :login, action: :index, status: 403 and return if user.nil?

      session[:current_user_id] = user.id #rescue nil
    end
  end

end
