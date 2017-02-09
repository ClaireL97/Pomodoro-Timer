class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def current_user
    @current_user ||= session_user.id &&
      User.find_by(id: session_user.id)
  end

end

