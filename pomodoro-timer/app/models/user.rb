class User < ApplicationRecord
  has_secure_password
  has_many :tasks
  validates :username, :password_digest, :email, presence: true
  validates :username, :email, uniqueness: true
end
