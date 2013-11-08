window.PollForUs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    var rawData = $("#bootstrapped-data");  
    var data = JSON.parse($("#bootstrapped-data").html());
    PollForUs.polls = new PollForUs.Collections.Polls(data, {parse: true});
    PollForUs.allAnswers = new PollForUs.Collections.AllAnswers();
    PollForUs.polls.forEach(function(poll) {
      poll.get("questions").forEach(function(question) {
        PollForUs.allAnswers.add(question.get("answers").models);
      });
    });
    new PollForUs.Routers.AppRouter($(".content"));
    Backbone.history.start();
    // debugger
    // PollForUs.polls.fetch({
      // success: function() {
      // }
    // });
    // pusher = new Pusher('079a3e6c11672d173dbf');
    // channel = pusher.subscribe('test_channel');
    // channel.bind('all_poll_answers', function(data) {
      // alert(data.message);
    // });
  }
};

$(document).ready(function(){
  PollForUs.initialize();
});
