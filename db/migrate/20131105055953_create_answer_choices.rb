class CreateAnswerChoices < ActiveRecord::Migration
  def change
    create_table :answer_choices do |t|
      t.integer :answer_id, null:false
      t.string :phone_number_digest, null:false

      t.timestamps
    end
    add_index :answer_choices, :answer_id
    add_index :answer_choices, :phone_number_digest
  end
end
