class Answer < ActiveRecord::Base
  attr_accessible :body, :question_id, :answer_choices_attributes

  validates :body, :question, presence: true

  has_many :answer_choices, :dependent => :destroy, :inverse_of => :answer
  belongs_to :question, :inverse_of => :answers

  accepts_nested_attributes_for :answer_choices, :reject_if => lambda { |a| a[:phone_number_digest].blank? }
end
