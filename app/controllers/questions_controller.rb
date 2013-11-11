class QuestionsController < ApplicationController
  respond_to :json
  before_filter :require_login

  def require_login
    redirect_to new_session_url unless current_user  
  end

  def create 
    @question = Question.new(params[:question]);
    debugger
    if @question.save
      render :json => :@question
    else
      
      render 422
    end
  end

  def update
    debugger
    @question = Question.find(params[:id]);
    if @question.update_attributes(params[:question])
      render :json => :@question
    else
      render 422
    end
  end

  def destroy
    @question = Question.find(params[:id]);
    if @question
      @question.destroy
    end
    render :json => @question
  end
end
