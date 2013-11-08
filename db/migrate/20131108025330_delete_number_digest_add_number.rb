class DeleteNumberDigestAddNumber < ActiveRecord::Migration
  def change
    remove_column :answer_choices, :phone_number_digest
    add_column :answer_choices, :phone_number,:string, :null => false
    add_index :answer_choices, :phone_number
  end
end
