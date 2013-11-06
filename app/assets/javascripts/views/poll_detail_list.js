PollForUs.Views.PollDetailList = Backbone.View.extend({
  tagName: "li",
  template: JST["polls/detail_list"],

  render: function() {
    var renderedContent = this.template({ poll: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});
