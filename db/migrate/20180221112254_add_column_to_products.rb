class AddColumnToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_products, :published, :boolean, default: true
  end
end
