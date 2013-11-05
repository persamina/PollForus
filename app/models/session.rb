class Session < ActiveRecord::Base
  attr_accessible :session_token, :user_id

  validates :session_token, :user_id, presence: true
  belongs_to :user

  before_validation :set_session_token

  def set_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64
    while Session.where("session_token = '#{token}'").count > 0
      token = SecureRandom::urlsafe_base64
    end
    token
  end

end
