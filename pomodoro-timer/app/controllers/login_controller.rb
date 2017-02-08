class LoginController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password])
      p @user
    end
    redirect_to new_login_path
  end

  def destroy
  end
end
