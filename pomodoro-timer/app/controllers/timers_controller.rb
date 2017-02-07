class TimersControllers < ApplicationController

  def new
    @timer = Timer.new
    @timer.save
  end
end