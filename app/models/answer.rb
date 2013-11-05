class Answer < ActiveRecord::Base
  attr_accessible :body, :question_id

  validates :body, :question_id, presence: true

  has_many :answer_choices, :dependent => :destroy
  belongs_to :question
end
