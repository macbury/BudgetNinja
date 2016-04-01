class CreateOperations < ActiveRecord::Migration
  def change
    create_table :operations do |t|
      t.money :amount
      t.string :note
      t.string :type, foreign_key: true
      t.references :profile, index: true, foreign_key: true
      t.references :account, index: true, foreign_key: true, null: false
      t.references :user, index: true, foreign_key: true, null: false
      t.timestamps null: false
    end
  end
end
