class User < ActiveRecord::Base
  attr_accessible :email, :password, :username, :confirm_token
  attr_reader :password

  validates :email, :username, presence: true
  validates :password, length: {minimum: 5, allow_nil: true }
  validates :email, uniqueness: true
  validates :username, uniqueness: true

  has_many :polls, :dependent => :destroy, :inverse_of => :user
  has_many :sessions, :dependent => :destroy

  before_validation :create_confirm_token
  before_validation :remove_whitespace

  def remove_whitespace
    self.email.strip!
    self.username.strip!
  end
  
  def create_confirm_token
    self.confirm_token = self.class.generate_confirm_token
  end

  def password=(password)
    @password = password
    @password.strip!
    self.password_digest = BCrypt::Password.create(password) 
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.generate_session_token
  end

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64
    while User.where("session_token = '#{token}'").count > 0
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def self.generate_confirm_token
    token = SecureRandom::urlsafe_base64
    while User.where("confirm_token = '#{token}'").count > 0
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by_email(email)

    if @user
      return @user if @user.is_password?(password)
    end
  end
end
