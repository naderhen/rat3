class Sale < ActiveRecord::Base
  belongs_to :grade
  belongs_to :user
  belongs_to :customer

  def active_model_serializer
    SaleSerializer
  end
end
