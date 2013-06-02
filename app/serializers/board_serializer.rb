class BoardSerializer < ActiveModel::Serializer
  attributes :id, :date, :organization_id, :salespeople
  has_many :warehouses
  has_many :grades, :through => :warehouses

  def salespeople
    Role.find_by_name(:salesperson).users
  end
end
