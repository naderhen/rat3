class SaleSerializer < ActiveModel::Serializer
  attributes :id, :amount, :grade_id, :user_id, :customer_id, :price, :invoice_date, :receive_date
end
