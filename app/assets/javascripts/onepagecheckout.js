function CheckoutManager (data) {
  this.state = data.state;
  this.errorDiv = data.errorDiv;
  this.previousStateForm = data.previousStateForm;
  this.formHeaderDiv = data.formHeaderDiv;
  this.nextStateForm = data.nextStateForm;
  this.currentStateDiv = data.currentStateDiv;
  this.stateLockVersion = data.stateLockVersion;
  this.activeList = data.activeList;
  this.checkoutProgressBar = data.checkoutProgressBar;
  this.saveButton = data.saveButton;
  this.stateForm = data.stateForm;
}

CheckoutManager.prototype.hideDivs = function() {
  this.errorDiv.hide();
  this.previousStateForm.hide();
};

CheckoutManager.prototype.updateStateLockVersion = function() {
  this.currentStateDiv.val(this.stateLockVersion);
};

CheckoutManager.prototype.updateCheckoutProgressBar = function() {
  this.activeList.removeClass('active').next().addClass('active');
  $('li.active').prevAll().addClass('completed');
  $('li.completed').each(function(index, list) {
    stateLink = $(list).find('a');
    state = stateLink.text().toLowerCase();
    stateLink.attr("href", "/checkout/" + state);
  });
};

CheckoutManager.prototype.hideProgressBar = function() {
  if (this.state == 'confirm') {
    this.checkoutProgressBar.hide();
  };
};

CheckoutManager.prototype.enableCoffeeScript = function() {
  if (this.state == 'address') {
    Spree.onAddress();
  };
  if (this.state == 'payment') {
    Spree.onPayment();
  }
};

CheckoutManager.prototype.afterFormRender = function() {
  this.updateStateLockVersion();
  this.updateCheckoutProgressBar();
  this.hideProgressBar();
  this.enableCoffeeScript();
};

CheckoutManager.prototype.displayErrors = function(errors) {
  errorDiv = $('<div>', {id: 'errorExplanation', class: 'alert alert-danger'});
  heading = $('<p style="margin-top: 60px">').text("There were problems with the following fields:");
  errorList = $('<ul>');
  errors = JSON.parse(errors);
  $.each(errors, function(key, message) {
    for(i = 0; i < message.length; i++) {
      list = $('<li>').text(key + " " +message[i]);
      errorList.append(list);
    }
  })
  errorDiv.append(heading, errorList);
  this.formHeaderDiv.append(errorDiv);
  this.saveButton.removeClass('disabled');
  this.stateForm.parent('div').find('input#order_state_lock_version').val(this.stateLockVersion);
};

CheckoutManager.prototype.init = function() {
  this.hideDivs();
};
