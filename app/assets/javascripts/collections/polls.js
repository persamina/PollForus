PollForUs.Collections.Polls = Backbone.Collection.extend({
  model: PollForUs.Models.Poll,
  url: "/polls",
});
