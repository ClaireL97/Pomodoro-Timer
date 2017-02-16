class ApplicationController < ActionController::Base
  include SessionsConcern
  protect_from_forgery with: :exception
end

