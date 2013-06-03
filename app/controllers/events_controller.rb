class EventsController < ApplicationController
  include ActionController::Live

  def index
    response.headers["Content-Type"] = "text/event-stream"
    redis = Redis.new
    redis.subscribe('message') do |on|
      on.message do |event, data|
        response.stream.write("data: #{data}\n\n")
      end
    end
  rescue IOError
      logger.info "Stream Closed"
  ensure
    redis.quit
    response.stream.close
  end
end
