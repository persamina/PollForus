class AnswerChoice < ActiveRecord::Base
  attr_accessible :answer_id, :phone_number
  
  # :existence is to check and see if answer_id is a valid id in answers
  # this is provided via the validates existence gem
  validates :answer_id, :existence => true

  validates_uniqueness_of :answer_id, :scope => :phone_number
  validates :answer, :phone_number, presence: true

  belongs_to :answer, :inverse_of => :answer_choices

  #def phone_number=(phone_number)
    #self.phone_number_digest = BCrypt::Password.create(phone_number)
  #end

  #def is_phone_number?(phone_number)
    #BCrypt::Password.new(self.phone_number_digest).is_password?(phone_number)
  #end

end
