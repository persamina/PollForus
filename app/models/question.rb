class Question < ActiveRecord::Base
  attr_accessible :body, :question_id

  validates :body, :question_id, presence: true

  belongs_to :poll
  has_many :answers, :dependent => :destroy
end
