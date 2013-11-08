PollForUs.Views.PollDetail = Backbone.View.extend({
  initialize: function() {
    this.listenTo(PollForUs.allAnswers, "add remove change", this.render);
  },
  template: JST["polls/detail"],

  render: function() {
    var renderedContent = this.template({ poll: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});
