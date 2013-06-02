class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.date :date
      t.integer :organization_id

      t.timestamps
    end
  end
end
