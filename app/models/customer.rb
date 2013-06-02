class Customer < ActiveRecord::Base
  has_many :sales

  def active_model_serializer
    CustomerSerializer
  end
end
