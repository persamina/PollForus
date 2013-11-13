class AuthMailer < ActionMailer::Base
  default from: "pollforusemail@gmail.com"

  def confirmation_email(user)
    mail(
      :to => user.email,
      :subject => "Welcome to pollfor.us! Confirm your email"
    )

  end
  
end
