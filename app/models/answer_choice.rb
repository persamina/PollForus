class AnswerChoice < ActiveRecord::Base
  attr_accessible :answer_id, :phone_number
  
  validates :answer_id, :phone_number_digest, presence: true
  validate :no_answer_from_number

  belongs_to :answer

  def no_answer_from_number
  end

  def phone_number=(phone_number)
    self.phone_number_digest = BCrypt::Password.create(phone_number)
  end

  def is_phone_number?(phone_number)
    BCrypt::Password.new(self.phone_number_digest).is_password?(phone_number)
  end


end
