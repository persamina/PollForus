class SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @email = params[:user][:email]
    @email.strip!
    @password = params[:user][:password] 
    @user = User.find_by_credentials(@email, @password);
    if @user && @user.verified
      @session = Session.create(user_id: @user.id)
      session[:session_token] = @session.session_token
      redirect_to :root
    else
      flash.now[:errors] = ["Invalid email or password"]
      unless (@user && @user.verified) 
        flash.now[:errors] = ["This email hasn't been verified please 
                               check email or user 'Forgot Password' 
                               to continue"]
      end
      render :new
    end
  end

  def destroy
    if (current_user)
      logout_current_user!
    end 
    redirect_to new_session_url
  end

  def sign_out
    destroy
  end

  def show_email_form
    render :show_email_form
  end

  def reset_email
    @email = params[:email]
    @user = User.find_by_email(@email)
    if @user 
      @user.confirm_token = User.generate_confirm_token
      @user.save
      @url = "#{show_reset_password_session_url}?confirm_token=#{@user.confirm_token}" 
      AuthMailer.delay.reset_password_email(@user, @url)
      #msg.deliver!
      flash[:notice] = [ "An email has been sent to #{@user.email} with further instructions." ]
      redirect_to new_session_url
    else
      flash.now[:errors] = [ "A user with that email wasn't found. Please try again." ]
      render :show_email_form
    end
  end

  def show_reset_password 
    @confirm_token = params[:confirm_token]
    @user = User.find_by_confirm_token(@confirm_token)
    render :show_reset_password 
  end

  def reset_password
    @confirm_token = params[:confirm_token]
    @user = User.find_by_confirm_token(@confirm_token)
    if @user 
      @user.password = params[:password]
      @user.save
      Session.create(user_id: @user.id)
      set_session_token_cookie(@user)
      flash[:successes] = [ "Password Reset!" ]
      redirect_to root_url
    else
      flash[:errors] = [ "Unable to Reset Password! Please try again." ]
      redirect_to new_session_url
    end
    
  end

end
