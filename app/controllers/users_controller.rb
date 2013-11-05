class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])

    if @user.save
      debugger
      set_session_token_cookie(@user)
      flash.now[:notice] = ["You've signed up with the email '#{@user.email}'"]
      redirect_to polls_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end 
  end

  def new
    render :new
  end 
end
