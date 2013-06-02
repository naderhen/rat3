class GradeSerializer < ActiveModel::Serializer
  attributes :id, :name, :total
  has_many :sales

end
