class LoginController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password])
      session[:current_user_id] = @user.id
       p session[:current_user_id]
      redirect_to user_index_path
    else
      redirect_to new_login_path
    end
  end

  def destroy
    p "current user #{current_user}"
    current_user = session[:current_user_id] = nil
    p current_user
    redirect_to new_login_path
  end
end
