PollForUs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($rootEl, $loginEl) {
    this.$rootEl = $rootEl,
    this.$loginEl = $loginEl
  },

  routes: {
    "": "showIndex",
    "signin": "showSignIn",
    "new": "showNew",
    ":id/edit": "showEdit",
    ":id": "showDetail"
  },

  showSignIn: function(show404) {
   var signIn = new PollForUs.Views.SignIn({
     show404: show404,
     $loginEl: this.$loginEl
   }); 
   this._swapView(signIn.render().$el);
  },

  showIndex: function() {
    if(PollForUs.currentUser.get("id")) 
    {
      var pollIndex = new PollForUs.Views.PollIndex({
        collection: PollForUs.polls 
      });
      this._swapView(pollIndex.render().$el);
    } else {
      Backbone.history.navigate("signin", {trigger: true });
    }
  },

  showDetail: function(id) {
    var appRouter = this;
    var currentPoll = PollForUs.polls.get(id);
    if(currentPoll) {
      this.updateDetailView(currentPoll);
    } else {
      currentPoll = new PollForUs.Models.Poll({id: id});
      currentPoll.fetch({
        success: function(model) {
          currentPoll.get("questions").forEach(function(question) {
            PollForUs.allAnswers.add(question.get("answers").models);
          });
          appRouter.updateDetailView(currentPoll);
        },
        error: function(model) {
          var show404 = true;
          if(PollForUs.currentUser.get("id")) {
            appRouter.showIndex();
          } else {
            appRouter.showSignIn(show404);
          }
        }
      });
    }
  },

  updateDetailView: function(poll) {
    var pollDetail = new PollForUs.Views.PollDetail({
      model: poll
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
