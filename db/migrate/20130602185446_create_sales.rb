class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.integer :amount
      t.integer :grade_id
      t.integer :user_id
      t.integer :customer_id
      t.float :price
      t.date :invoice_date
      t.date :receive_date

      t.timestamps
    end
  end
end
