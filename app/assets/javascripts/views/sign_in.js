PollForUs.Views.SignIn = Backbone.View.extend({
  initialize: function(options) {
    this.show404 = options.show404;
    this.$loginEl = options.$loginEl;
  },

  events: {
    "submit .sign-in-form": "submit",
  },
  
  template: JST["session/new"],
  loginTemplate: JST["session/logout"],
  addErrorsTemplate: JST["polls/add_errors"],

  render: function() {
    var signIn = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    if(this.show404 === true) {
      var renderedErrorsContent = this.addErrorsTemplate({
        errors: ["Page doesn't exist! Please log in"]
      });
      this.$el.find(".errors").html(renderedErrorsContent);
    }
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    signInView = this;
    var signInValues = $(event.target).serializeJSON();
    var newSession = new PollForUs.Models.Session(signInValues);

    newSession.save({}, {
      success: function(model, response, options) {
        PollForUs.currentUser.set(response); 
        PollForUs.polls.fetch();
        renderedLogoutButton = signInView.loginTemplate();
        signInView.$loginEl.html(renderedLogoutButton);
        Backbone.history.navigate("", {trigger: true});
      },
      error: function(model) {
      var renderedErrorsContent = this.addErrorsTemplate({
        errors: ["Invalid username or password, please try again!"]
      });
      this.$el.find(".errors").html(renderedErrorsContent);

      }

    });

  },

});
