require 'active_support/concern'
module SessionsConcern
  extend ActiveSupport::Concern

  def session_logged_in?
    !session[:current_user_id].nil?
  end

  def session_user
    begin
      @current_user ||= User.find(session[:current_user_id])
    rescue ActiveRecord::RecordNotFound => e
      session.clear
      @current_user = nil
    end
  end

  def session_logout
    session.clear
  end

  def session_login user
    session[:current_user_id] = user.id
  end
end
