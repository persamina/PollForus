PollForUs.Views.PollDetail = Backbone.View.extend({
  template: JST["polls/detail"],

  initialize: function() {
    this.listenTo(PollForUs.allAnswers, "add remove change", this.render);
    this.listenTo(PollForUs.polls, "add remove, change", this.render);
  },
  events: {
    "click .delete-poll": "deletePoll",
    "click .delete-question": "deleteQuestion",
  },

  colorOptions: ["#540D26", "#B8B4AD", "#007599", "#BC5A33", "#2C2C31", 
                 "#00A4A3", "#E0B217", "#289E73", "#5C3F63", "#5A4A42"],

  render: function() {
    var pollDetail = this;
    var renderedContent = this.template({ poll: this.model});
    this.$el.html(renderedContent);
    this.model.get("questions").forEach(function(question) {
      pollDetail.setupChart(question);
    });
    return this;
  },
  setupChart: function(question) {
    var pollDetail = this;
    var ctx = this.$el.find("#question-results-" + question.id).get(0).getContext("2d");
    var myNewChart = new Chart(ctx);
    var data =[];

    question.get("answers").forEach(function(answer) {
      data.push({value: answer.get("user_answers"), color: pollDetail.randomColor()});
    });
    new Chart(ctx).Pie(data);
    
  },
  randomColor: function(number) {
    return this.colorOptions[Math.floor((Math.random()*this.colorOptions.length))];
  },

  deletePoll: function(event) {
    event.preventDefault();
    var iconClicked = $(event.target);
    var pollId = iconClicked.parent().data("pollId");
    var pollToDelete = this.model;
    pollToDelete.destroy({
      wait:true,
      success: function(model, response) {
        model.get("questions").forEach(function(question) {
          PollForUs.allAnswers.remove(question.get("answers").models);
        });
      }
    });

    Backbone.history.navigate("", {trigger: true});

  },
  deleteQuestion: function(event) {
    event.preventDefault();
    debugger
    var iconClicked = $(event.target);
    var questionId = iconClicked.parent().data("questionId");
    var questionToDelete = this.model.get("questions").get(questionId);
    questionToDelete.destroy({
      wait:true,
      success: function(model, response) {
        PollForUs.allAnswers.remove(model.get("answers").models);
      }
    });

  },

});
