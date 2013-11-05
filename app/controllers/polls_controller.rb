class PollsController < ApplicationController

  before_filter :require_login

  def require_login
    redirect_to new_session_url unless current_user  
  end

  def index 
    debugger
    @polls = Poll.find_by_user_id(params[:user_id])
    render :index
  end

  def new
    render :new
  end

  def create 
  end

end
