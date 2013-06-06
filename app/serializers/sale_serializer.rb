class SaleSerializer < ActiveModel::Serializer
  attributes :id, :amount, :grade_id, :user_id, :customer_id, :price, :invoice_date, :receive_date, :grade_name, :warehouse_name, :user_name, :customer_name

  def grade_name
    object.grade.name
  end

  def warehouse_name
    object.grade.warehouse.name
  end

  def user_name
    object.user.name
  end

  def customer_name
    object.customer.name
  end
end
