class AnswersController < ApplicationController
  respond_to :json
  before_filter :require_login

  def require_login
    redirect_to new_session_url unless current_user  
  end

  def create 
    @answer = Answer.new(params[:answer]);

    if @answer.save
      render :json => @answer
    else
      render 422
    end
  end

  def update
    @answer = Answer.find(params[:answer_id]);

    if @answer.update_attributes(params[:answer])
      render :json => @answer
    else
      render 422
    end
  end

  def destroy
    @answer = Answer.find(params[:id]);

    if @answer
      @answer.destroy
    end
    render :json => @answer
  end
end
