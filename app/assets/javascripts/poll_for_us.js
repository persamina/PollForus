window.PollForUs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
        console.log("here!")
    //commonly used templates
    PollForUs.Store = {
      addErrorsTemplate: JST["polls/add_errors"],
      addNoticesTemplate: JST["polls/add_notices"],
      addSuccessesTemplate: JST["polls/add_successes"]
    };

    var pollData = JSON.parse($("#polls-data").html());
    var currentUserData = JSON.parse($("#current-user-data").html());

    //creating Backbone Collections and models from bootstrapped data
    PollForUs.currentUser = new PollForUs.Models.CurrentUser(currentUserData);
    PollForUs.polls = new PollForUs.Collections.Polls(pollData, {parse: true});
    PollForUs.allAnswers = new PollForUs.Collections.AllAnswers();
    PollForUs.polls.forEach(function(poll) {
      poll.get("questions").forEach(function(question) {
        PollForUs.allAnswers.add(question.get("answers").models);
      });
    });

    PollForUs.csrfToken = $("meta[name='csrf-token']").attr('content');

    Backbone._sync = Backbone.sync;
    /* define a new sync method */
    // http://blog.softr.li/post/43146401263/finally-correctly-dealing-with-rails-csrf-protection
    // http://ngauthier.com/2011/02/backbone-and-rails-forgery-protection.html
    Backbone.sync = function(method, model, options) {
      /* only need a token for non-get requests */
      if (method == 'create' || method == 'update' || method == 'delete') {
        /* grab the token from the meta tag rails embeds */
        var auth_options = {};

        auth_options[$("meta[name='csrf-param']").attr('content')] = PollForUs.csrfToken;
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', PollForUs.csrfToken);
        }

        /* set it as a model attribute without triggering events */
        model.set(auth_options, {silent: true});
      }


      /* proxy the call to the old sync method */
      return Backbone._sync(method, model, options);
    }

    new PollForUs.Routers.AppRouter($(".content"), $(".log-in-content"));
    Backbone.history.start();



  }

};

$(document).ready(function(){
  PollForUs.initialize();
});
