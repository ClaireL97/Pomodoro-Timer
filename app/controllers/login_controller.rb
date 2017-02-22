class LoginController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password_digest])
      session_login @user
      redirect_to root_url
    else
      flash[:notice] = "Invalid Email/Password Combination"
      redirect_to new_login_path
    end
  end

  def destroy
    session_logout
    redirect_to root_url
  end

end
