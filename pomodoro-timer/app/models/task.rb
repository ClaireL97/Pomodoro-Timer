class Task < ApplicationRecord
  belongs_to :users

  validates :submitted_task
end
