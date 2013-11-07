class TextMessagesController < ApplicationController
  def send_text_message
    debugger
    number_to_send_to = "9287134405"
    @twilio_client = Twilio::REST::Client.new ENV["TWILIO_SID"], 
                                              ENV["TWILIO_AUTH_TOKEN"]
    @twilio_client.account.sms.messages.create(
      :from => "+1#{ENV["TWILIO_PHONE_NUMBER"]}",
      :to => number_to_send_to,
      :body => "This is a message. Will it send?"
    )

    redirect_to root_url
  end

  def receive_text_message
    
    p params

  end
end
