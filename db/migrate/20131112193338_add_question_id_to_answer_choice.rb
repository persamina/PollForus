class AddQuestionIdToAnswerChoice < ActiveRecord::Migration
  def change
    add_column :answer_choices, :question_id, :string, :null => false
  end
end
