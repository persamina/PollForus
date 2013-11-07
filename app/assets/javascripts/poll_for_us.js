window.PollForUs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //var rawData = $("#bootstrapped-data");  
    //var data = JSON.parse($("#bootstrapped-data").html());
    PollForUs.polls = new PollForUs.Collections.Polls();
    PollForUs.polls.fetch({
      success: function() {
        new PollForUs.Routers.AppRouter($(".content"));
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  PollForUs.initialize();
});
