class Question < ActiveRecord::Base
  attr_accessible :body, :poll_id

  validates :body, :poll_id, presence: true

  belongs_to :poll
  has_many :answers, :dependent => :destroy
end
