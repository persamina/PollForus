PollForUs.Views.PollDetail = Backbone.View.extend({
  template: JST["polls/detail"],

  render: function() {
    var renderedContent = this.template({ poll: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});
