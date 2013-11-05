class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :body, null: false
      t.integer :question_id, null: false

      t.timestamps
    end
    add_index :answers, :question_id
  end
end
