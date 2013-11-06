PollForUs.Views.PollDetail = Backbone.View.extend({
  tagName: "li",
  template: JST["polls/detail"],

  render: function() {
    var renderedContent = this.template({ poll: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});
