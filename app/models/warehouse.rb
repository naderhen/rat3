class Warehouse < ActiveRecord::Base
  belongs_to :board
  has_many :grades, :dependent => :destroy

  def active_model_serializer
    WarehouseSerializer
  end
end
