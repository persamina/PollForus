class AnswerChoice < ActiveRecord::Base
  attr_accessible :answer_id, :phone_number
  
  validates :answer, :phone_number_digest, presence: true
  # :existence is to check and see if answer_id is a valid id in answers
  # this is provided via the validates existence gem
  validates :answer_id, :existence => true
  validate :no_answer_from_number

  belongs_to :answer, :inverse_of => :answer_choices

  def no_answer_from_number
  end

  def phone_number=(phone_number)
    self.phone_number_digest = BCrypt::Password.create(phone_number)
  end

  def is_phone_number?(phone_number)
    BCrypt::Password.new(self.phone_number_digest).is_password?(phone_number)
  end


end
