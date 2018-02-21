Spree::Variant.class_eval do
  def available?
    !discontinued? && product.available? && !published?
  end
end
