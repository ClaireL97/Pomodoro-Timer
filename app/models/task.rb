class Task < ApplicationRecord
  belongs_to :user

  validates :submitted_task, presense: true
end
