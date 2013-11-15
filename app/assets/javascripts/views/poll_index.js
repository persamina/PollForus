PollForUs.Views.PollIndex = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(this.collection, "add remove change", this.render);
    this.listenTo(this.collection, "newSuccessMessage", this.newSuccessMessage);
  },
  events: {
    "click .delete-poll": "deletePoll",
  },

  template: JST["polls/index"],
  signInTemplate: JST["session/new"],

  render: function() {
    var pollIndex = this;

    if(PollForUs.currentUser) {
      var renderedContent = this.template();
      this.$el.html(renderedContent);
      this.collection.forEach(function(poll) {
        var pollDetail = new PollForUs.Views.PollDetailList({
          model: poll
        });
        pollIndex.$(".polls").append(pollDetail.render().$el);
      });
    } else {
      Backbone.history.navigate("#signin", {trigger: true});
      //var renderedContent = this.signInTemplate();
      //this.$el.html(renderedContent);
    }
    return this;
  },

  newSuccessMessage: function(options) {
    renderedSuccesses = PollForUs.Store.addSuccessesTemplate({
      successes: options.messages
    });
    this.$el.find(".successes").html(renderedSuccesses);
  },

  deletePoll: function(event) {
    event.preventDefault();
    var iconClicked = $(event.target);
    var pollId = iconClicked.parent().data("pollId");
    var pollToDelete = this.collection.get(pollId);
    pollToDelete.destroy({
      wait:true,
      success: function(model, response) {
        model.get("questions").forEach(function(question) {
          PollForUs.allAnswers.remove(question.get("answers").models);
        });
      }
    });

  },

});
