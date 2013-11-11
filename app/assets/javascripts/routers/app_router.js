PollForUs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "showIndex",
    "polls/new": "showNew",
    "polls/:id/edit": "showEdit",
    "polls/:id": "showDetail"
  },

  showIndex: function() {
    var pollIndex = new PollForUs.Views.PollIndex({
      collection: PollForUs.polls 
    });

    this._swapView(pollIndex.render().$el);
    
  },

  showDetail: function(id) {
    var currentPoll = PollForUs.polls.get(id);
    var pollDetail = new PollForUs.Views.PollDetail({
       model: currentPoll
    });
    
    this._swapView(pollDetail.render().$el);
  },

  showNew: function() {
    var newPoll = new PollForUs.Models.Poll();
    var pollNew = new PollForUs.Views.PollNew({
      collection: PollForUs.polls,
      model: newPoll
    });

    this._swapView(pollNew.render().$el);
  },

  showEdit: function(id) {
    var editPoll = PollForUs.polls.get(id);
    var pollEdit = new PollForUs.Views.PollEdit({
      collection: PollForUs.polls,
      model: editPoll
    });

    this._swapView(pollEdit.render().$el);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view);
  },

});
