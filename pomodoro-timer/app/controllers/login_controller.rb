class LoginController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password])
      session[:current_user_id] = @user.id
      redirect_to root_url
    else
      redirect_to new_login_path
    end
  end

  def destroy
    @current_user = session[:current_user_id] = nil
    redirect_to root_url
  end
end
