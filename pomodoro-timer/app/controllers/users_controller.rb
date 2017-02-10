class UsersController < ApplicationController
  include SessionHelper

  def new
    @user = User.new
    render :new
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    @user.password = user_params[:password_digest]
    @user.timer_count = 0
      if @user.save
        session_login @user
        redirect_to root_url
      else
        @user.errors.full_messages
        render :new
      end
  end

  def update
    @user = User.find(params[:id])
    p @user
    if request.xhr?
      @user.timer_count += 1
      @user.save
    else
      redirect_to root_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password_digest, :encrypted_password)
  end
end
