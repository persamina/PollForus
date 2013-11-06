PollForUs.Views.PollIndex = Backbone.View.extend({
  
  template: JST["polls/index"],

  render: function() {
    var pollIndex = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.collection.forEach(function(poll) {
      var pollDetail = new PollForUs.Views.PollDetail({
        model: poll
      });
      pollIndex.$(".polls").append(pollDetail.render().$el);
    });
    return this;
  },
});
