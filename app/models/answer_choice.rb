class AnswerChoice < ActiveRecord::Base
  #question_id is used to make sure that we don't allow multiple votes only
  attr_accessible :answer_id, :phone_number, :question_id
  
  # :existence is to check and see if answer_id is a valid id in answers
  # this is provided via the validates existence gem
  validates :answer_id, :existence => true
  validates :answer, :phone_number, :question_id, presence: true
  validates_uniqueness_of :answer_id, :scope => :phone_number

  belongs_to :answer, :inverse_of => :answer_choices
end
