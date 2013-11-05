# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131105145325) do

  create_table "answer_choices", :force => true do |t|
    t.integer  "answer_id",           :null => false
    t.string   "phone_number_digest", :null => false
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  add_index "answer_choices", ["answer_id"], :name => "index_answer_choices_on_answer_id"
  add_index "answer_choices", ["phone_number_digest"], :name => "index_answer_choices_on_phone_number_digest"

  create_table "answers", :force => true do |t|
    t.string   "body",        :null => false
    t.integer  "question_id", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "answers", ["question_id"], :name => "index_answers_on_question_id"

  create_table "polls", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "polls", ["user_id"], :name => "index_polls_on_user_id"

  create_table "questions", :force => true do |t|
    t.string   "body",       :null => false
    t.integer  "poll_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "questions", ["poll_id"], :name => "index_questions_on_poll_id"

  create_table "sessions", :force => true do |t|
    t.string   "session_token"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "sessions", ["session_token"], :name => "index_sessions_on_session_token"
  add_index "sessions", ["user_id"], :name => "index_sessions_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "email",           :null => false
    t.string   "password_digest", :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["password_digest"], :name => "index_users_on_password_digest"
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
