class ApplicationController < ActionController::Base
  include ActionController::HttpAuthentication::Basic::ControllerMethods
  include Rails.application.routes.url_helpers
  include ActionController::Redirecting
  include AbstractController::Helpers
  include ActionController::Cookies

  def current_user
    #raise "WTF is wrong here? ->#{session[:current_user_id]}<-"
    @current_user ||= session[:current_user_id] && (User.find(session[:current_user_id]) rescue nil)
    reset_session if @current_user.nil?
    @current_user
  end

end
