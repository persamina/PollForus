PollForUs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "showIndex",
    "polls/new": "showNew",
    "polls/:id": "showDetail"
  },

  showIndex: function() {
    var pollIndex = new PollForUs.Views.PollIndex({
      collection: PollForUs.polls 
    });

    this.$rootEl.html(pollIndex.render().$el);
    
  },

  showDetail: function(id) {
    var currentPoll = PollForUs.polls.get(id);

    var pollDetail = new PollForUs.Views.PollDetail({
       model: currentPoll
    });
    
    this.$rootEl.html(pollDetail.render().$el);
  },

  showNew: function() {
    var newPoll = new PollForUs.Models.Poll();
    var pollNew = new PollForUs.Views.PollNew({
      model: newPoll
    });

    this.$rootEl.html(pollNew.render().$el);
  },

});
