class AddIndexToProducts < ActiveRecord::Migration[5.1]
  def change
    add_index :spree_products, :published
  end
end
