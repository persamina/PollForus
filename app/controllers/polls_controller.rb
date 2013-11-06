class PollsController < ApplicationController
  layout "backbone"
  respond_to :json

  before_filter :require_login

  def require_login
    redirect_to new_session_url unless current_user  
  end

  def index 
    @polls = Poll.find_all_by_user_id(current_user.id)
    respond_to do |format|
      format.html { render :index }
      format.json { render :indexRABL }
    end
  end

  def new
    render :new
  end

  def create 
  end

end
