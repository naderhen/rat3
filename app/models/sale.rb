class Sale < ActiveRecord::Base
  belongs_to :grade
  belongs_to :user
  belongs_to :customer
end
