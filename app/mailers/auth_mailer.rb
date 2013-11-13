class AuthMailer < ActionMailer::Base
  default from: "pollforusemail@gmail.com"

  def confirmation_email(user, url)
    @user = user
    @url = url
    mail(
      :to => user.email,
      :subject => "Welcome to pollfor.us! Confirm your email"
    )
  end

  def reset_password_email(user, url)
    @user = user
    @url = url
    mail(
      :to => user.email,
      :subject => "pollfor.us Password Reset Request"
    )
  end
  
end
