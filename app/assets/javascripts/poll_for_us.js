window.PollForUs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    var pollData = JSON.parse($("#polls-data").html());
    var currentUserData = JSON.parse($("#current-user-data").html());
    PollForUs.currentUser = new PollForUs.Models.CurrentUser(currentUserData);
    PollForUs.polls = new PollForUs.Collections.Polls(pollData, {parse: true});
    PollForUs.allAnswers = new PollForUs.Collections.AllAnswers();
    PollForUs.polls.forEach(function(poll) {
      poll.get("questions").forEach(function(question) {
        PollForUs.allAnswers.add(question.get("answers").models);
      });
    });
    new PollForUs.Routers.AppRouter($(".content"), $(".log-in-content"));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollForUs.initialize();
});
