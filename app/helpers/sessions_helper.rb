module SessionsHelper
  def current_user
    @session = Session.find_by_session_token(session[:session_token])
    if @session
      return User.find(@session.user_id)
    end 
  end

  def set_session_token_cookie(user)
    @session = Session.find_by_user_id(user.id)
    session[:session_token] = @session.session_token
  end

  def logout_current_user!
    @session = Session.find_by_session_token(session[:session_token])
    @session.destroy
    session[:session_token] = nil
  end

  def require_current_user!
    redirect_to new_session_url if current_user.nil?
  end

  def require_no_current_user!
    redirect_to user_url(current_user) unless current_user.nil?
  end
end
