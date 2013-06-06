class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    @board = Board.last

    redirect_to organization_board_path @board.organization, @board
  end
end
