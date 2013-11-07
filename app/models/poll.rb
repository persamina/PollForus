class Poll < ActiveRecord::Base
  attr_accessible :name, :user_id, :questions_attributes

  validates :name, :user, presence: true
  
  belongs_to :user, :inverse_of => :polls
  has_many :questions, :dependent => :destroy, :inverse_of => :poll
  accepts_nested_attributes_for :questions, :reject_if => lambda { |a| a[:body].blank? }
end
