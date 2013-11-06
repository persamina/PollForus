PollForUs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "showIndex"
  },

  showIndex: function() {
    var pollIndex = new PollForUs.Views.PollIndex({
      collection: PollForUs.polls 
    });

    this.$rootEl.html(pollIndex.render().$el)
  },

});
