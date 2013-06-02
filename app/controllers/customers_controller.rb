class CustomersController < ApplicationController
  def search
    @customers = Customer.where("name ~* ?", params[:term])
    render :json => @customers
  end
end
