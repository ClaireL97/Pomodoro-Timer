class TasksController < ApplicationController
  include SessionHelper
  def show
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(task_params)
    redirect_to @task.save ? root_path : new_task_path
  end

  def new
    @task = Task.new
    render :new
  end

  def index
    @user_tasks = session_logged_in? ? Task.where(user_id:  session_user.id).last(10) : nil
    @update_user_path = session_logged_in? ? "/users/#{session_user.id}" : ""
    render :index
  end

  private
    def task_params
      params.require(:task).permit(:user_id, :submitted_task)
    end
end
