class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    if @user.save
      set_session_token_cookie(@user)
      flash[:notice] = ["Almost signed up! A confirmation email was sent to #{ @user.email}. Please check your email to continue to create your first poll!"]
      redirect_to polls_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end 
  end

  def new
    render :new
  end 

  def confirm_email
    debugger
    @session_token = params[:session_token]
    p @session_token
  end
end
