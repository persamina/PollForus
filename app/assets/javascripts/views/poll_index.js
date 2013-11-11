PollForUs.Views.PollIndex = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(this.collection, "add remove change", this.render);
  },
  events: {
    "click .delete-poll": "deletePoll",
  },

  template: JST["polls/index"],

  render: function() {
    var pollIndex = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.collection.forEach(function(poll) {
      var pollDetail = new PollForUs.Views.PollDetailList({
        model: poll
      });
      pollIndex.$(".polls").append(pollDetail.render().$el);
    });
    return this;
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

  editPoll: function(event) {
    var iconClicked = $(event.target);
    var pollId = iconClicked.parent().data("pollId");
    var pollToDelete = this.collection.get(pollId);
    console.log("edit me");

  }
});
