class User < ApplicationRecord
  has_secure_password

  validates :username, :password_digest, :email, presence: true
  validates :username, :email, uniqueness: true
end
