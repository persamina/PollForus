collection @polls
attributes :id, :name, :user_id
child(:questions) do
  attributes :id, :body, :poll_id, :created_at, :updated_at
  child(:answers) do
    attributes :id, :body, :question_id, :created_at, :updated_at
    node(:user_answers) { |answer| answer.answer_choices.count }
  end
end
