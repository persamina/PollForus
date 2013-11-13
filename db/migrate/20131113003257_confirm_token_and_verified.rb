class ConfirmTokenAndVerified < ActiveRecord::Migration
  def change
    add_column :users, :confirm_token, :string
    add_column :users, :verified, :boolean, :default => false
  end
end