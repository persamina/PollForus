class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :name, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :polls, :user_id
  end
end
