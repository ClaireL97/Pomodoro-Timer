class TasksController < ApplicationController
  def show
    p "------------------------------------------------------------"
    p params
    p "------------------------------------------------------------"
    @task = Task.find(params[:id])
  end

  def create
    p "@@@@@@@@@@@@@@@@@@@@"
    @task = Task.new(params[:submitted_task])
    # p params
    if @task.save!
      redirect_to task_path(@task.id)
    else
      redirect_to new_task_path
    end

  end

  def new
    @task = Task.new
    render :new
  end

  def index
    render :index
  end
end
