PollForUs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "showIndex",
    "polls/:id": "showDetail"
  },

  showIndex: function() {
    var pollIndex = new PollForUs.Views.PollIndex({
      collection: PollForUs.polls 
    });

    this.$rootEl.html(pollIndex.render().$el);
    
  },

  showDetail: function(id) {
    console.log("in showDetail");
    var currentPoll = PollForUs.polls.get(id);

    var pollDetail = new PollForUs.Views.PollDetail({
       model: currentPoll
    });
    debugger
    
    this.$rootEl.html(pollDetail.render().$el);
  },

});
