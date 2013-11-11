class PollsController < ApplicationController
  layout "backbone"
  respond_to :json

  before_filter :require_login

  def require_login
    redirect_to new_session_url unless current_user  
  end

  def index 
    @polls = Poll.includes(:questions => {:answers => :answer_choices}).where(:user_id => current_user.id)

    #@polls = Poll.find_all_by_user_id(current_user.id)
    respond_to do |format|
      format.html { render :index }
      format.json { render :indexRABL }
    end
  end

  def create 
    @poll = Poll.new(params[:poll])
    @poll.user_id = current_user.id
    if @poll.save
      render :showRABL
    else
      render 422
    end
  end

  def update
    puts params
    @poll = Poll.find(params[:id])
    if @poll.update_attributes(params[:poll])
      render :showRABL
    else
      render 422
    end
  end

  def destroy
    @poll = Poll.find(params[:id])
    if @poll
      @poll.destroy
    end
    render :showRABL
  end

end
