class LoginController < ApplicationController

  #the redirects on this page will go to the homepage (the ones going to root_url)
  def new
    render :new
  end

  def create
    p "----------"
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password_digest])
      session[:current_user_id] = @user.id
      redirect_to root_url
    else
      flash[:notice] = "Invalid Email/Password Combination"
      redirect_to new_login_path
    end
  end

  def destroy
    current_user = session[:current_user_id] = nil
    redirect_to root_url
  end

end
