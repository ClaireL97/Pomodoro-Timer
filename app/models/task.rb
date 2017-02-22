class Task < ApplicationRecord
  belongs_to :user

  validates :submitted_task, presence: true
end
