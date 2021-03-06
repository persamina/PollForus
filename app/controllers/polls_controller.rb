class PollsController < ApplicationController
  layout "backbone"
  respond_to :json

  before_filter :require_login, :except => [:index, :show]

  def require_login
    redirect_to new_session_url unless current_user
  end

  def index
    if current_user
      #allows us to use @current_user in userRABL file
      @current_user = current_user
      @polls = Poll.includes(:questions => {:answers => :answer_choices}).where(:user_id => current_user.id)
    end

    if(@polls)
      respond_to do |format|
        format.html { render :index }
        format.json { render :indexRABL }
      end
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

  def show
    @poll = Poll.find(params[:id])
    if @poll
      render :showRABL
    else
      render 422
    end
  end

  def update
    @poll = Poll.find(params[:id])
    if @poll.update_attributes(params[:poll])
      render :showRABL
    else
      render 422
    end
  end

  def destroy
    puts "here in polls controller!"
    @poll = Poll.find(params[:id])
    if @poll
      @poll.destroy
    end
    render :showRABL
  end
end
