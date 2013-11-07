class Answer < ActiveRecord::Base
  attr_accessible :body, :question_id

  validates :body, :question, presence: true

  has_many :answer_choices, :dependent => :destroy
  belongs_to :question, :inverse_of => :answers
end
