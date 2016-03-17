class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :name, null: false, default: ''
      t.integer :account_id
      t.integer :user_id

      t.timestamps null: false
    end
    add_index :profiles, :account_id
    add_index :profiles, :user_id
  end
end
