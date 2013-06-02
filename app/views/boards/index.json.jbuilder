json.array!(@boards) do |board|
  json.extract! board, :date, :organization_id
  json.url organization_board_url([@organization.id, board], format: :json)
end
