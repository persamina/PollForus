class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])

    if @user.save
      @url = "#{user_confirm_email_url(@user)}?confirm_token=#{@user.confirm_token}"
      #using delayed job (.delay) to send confirmation_email
      AuthMailer.delay.confirmation_email(@user, @url)
      
      #set_session_token_cookie(@user)
      flash[:notice] = ["Almost signed up! A confirmation email was sent to #{ @user.email}. Please check your email to continue to create your first poll!"]

      redirect_to new_session_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end 
  end

  def new
    render :new
  end 

  def confirm_email
    @confirm_token = params[:confirm_token]
    @user = User.find_by_confirm_token(@confirm_token)

    if @user 
      @user.confirm_token = "";
      @user.verified = true;
      @user.save

      Session.create(user_id: @user.id)
      set_session_token_cookie(@user)

      flash[:successes] = [ "Email confirmed!" ]
      redirect_to polls_url
    else
      flash[:errors] = [ "Unable to Confirm! Please use the 'Forgot Password' to reset password." ]
      redirect_to new_session_url
    end
  end
end
