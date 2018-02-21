# This migration comes from spree_simple_sales (originally 20180216104130)
class AddSalePriceToSpreeVariants < SpreeExtension::Migration[4.2]
  def change
    add_column :spree_variants, :sale_price, :decimal
  end
end
