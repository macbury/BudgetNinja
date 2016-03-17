class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string  :name, default: ''
      t.integer :user_id
      t.money   :balance
      t.timestamps null: false
    end
    add_index :accounts, :user_id
  end
end
