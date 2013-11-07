object @poll
attributes :id, :name, :user_id
child(:questions) do
  attributes :id, :body, :poll_id, :created_at, :updated_at
  child(:answers) do
    attributes :id, :body, :question_id, :created_at, :updated_at
    child(:answer_choices) do
      attributes :id, :answer_id, :phone_number_digest
    end
  end
end
