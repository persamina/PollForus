class Question < ActiveRecord::Base
  attr_accessible :body, :poll_id, :answers_attributes

  validates :body, :poll, presence: true

  belongs_to :poll, :inverse_of => :questions
  has_many :answers, :dependent => :destroy, :inverse_of => :question
  accepts_nested_attributes_for :answers, :reject_if => lambda { |a| a[:body].blank? }
end
