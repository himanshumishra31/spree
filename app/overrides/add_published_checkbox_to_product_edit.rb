Deface::Override.new(virtual_path: 'spree/admin/products/_form',
  name: 'add_published_checkbox_to_product_edit',
  insert_after: "erb[loud]:contains('text_field :sale_price')",
  text: "
    <%= f.field_container :published do %>
      <%= f.label :published, raw(Spree.t(:published)) %>
      <%= f.check_box :published %>
    <% end %>
    ")
