class Grade < ActiveRecord::Base
  belongs_to :warehouse
  has_many :sales

  def active_model_serializer
    GradeSerializer
  end
end
