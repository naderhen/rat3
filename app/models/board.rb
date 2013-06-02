class Board < ActiveRecord::Base
  belongs_to :organization
  has_many :warehouses, :dependent => :destroy
  has_many :grades, :through => :warehouses


  accepts_nested_attributes_for :warehouses

  def active_model_serializer
    BoardSerializer
  end
end
