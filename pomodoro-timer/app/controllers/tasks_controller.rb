class TasksController < ApplicationController
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
    @user_tasks = Task.where(user_id:  session[:current_user_id])
    render :index
  end

  private
    def task_params
      params.require(:task).permit(:user_id, :submitted_task)
    end
end
