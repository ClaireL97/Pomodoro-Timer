class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :submitted_task
      t.integer :user_id
      t.timestamps
    end
  end
end
