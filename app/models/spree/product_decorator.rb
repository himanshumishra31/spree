Spree::Product.class_eval do
  scope :published, -> { where(published: true) }
  def available?
    !(available_on.nil? || available_on.future?) && !deleted? && !discontinued? && published?
  end
end
