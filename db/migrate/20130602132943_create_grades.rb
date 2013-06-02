class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.integer :warehouse_id
      t.string :name
      t.integer :total
      t.date :available

      t.timestamps
    end
  end
end
