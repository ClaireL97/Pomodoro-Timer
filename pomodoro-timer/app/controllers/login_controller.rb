class LoginController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    p @user.password_digest
    p @user.email
    p @user.id

    redirect_to new_login_path
  end

  def destroy
  end
end
