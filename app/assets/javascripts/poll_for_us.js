window.PollForUs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    PollForUs.polls = new PollForUs.Collections.Polls();
    PollForUs.polls.fetch({
      success: function(data) {
        new PollForUs.Routers.AppRouter($(".content"));
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  PollForUs.initialize();
});
