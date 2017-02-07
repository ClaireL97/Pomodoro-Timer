class CreateTimers < ActiveRecord::Migration[5.0]
  def change
    create_table :timers do |t|
      t.string :result
      t.datetime :ended_at
      t.integer :user_id
      t.timestamps
    end
  end
end
