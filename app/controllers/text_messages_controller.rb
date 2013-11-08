class TextMessagesController < ApplicationController

  def receive_text_message
    @message_text = params["Body"].gsub(/\s+/, "")    
    @from_phone_number = params["From"]
    @message = "You didn't send us a number please try again!"
    if is_i?(@message_text)
      @answer_id = @message_text.to_i
      @answer_choice = AnswerChoice.new(answer_id: @answer_id, phone_number: params["From"])
      if @answer_choice.valid?
        @answer_choice.save
        #@poll_id = @answer_choice.answer.question.poll.id
        sendPusherEvent(@answer_choice)

        @message = "You voted! :) you texted us '#{@answer_id}'."
      else
        @message = "Invalid number or you may have already voted! please try again!"
       
      end
    end
      send_text_message(@message, @from_phone_number)
      head 200, :content_type => 'text/html'
  end

  def is_i?(str)
    !!(str =~ /^[-+]?[0-9]+$/)
  end

  def send_text_message(message, phone_number)

    @twilio_client = Twilio::REST::Client.new ENV["TWILIO_SID"], 
                                              ENV["TWILIO_AUTH_TOKEN"]
    @twilio_client.account.sms.messages.create(
      :from => "+1#{ENV["TWILIO_PHONE_NUMBER"]}",
      :to => phone_number,
      :body => message
    )

  end

  def sendPusherEvent(answer_choice)

    @answer = Answer.find(answer_choice.answer_id)
    puts "ANTTI ANSWER= --#{@answer}--"
    puts "ANTTI ANSWER_CHOICE= --#{answer_choice}--"
    Pusher.trigger("all_poll_answers", 'updated', {"answer_id" => answer_choice.answer_id, "user_answers" => @answer.answer_choices.count})
    
  end
end
