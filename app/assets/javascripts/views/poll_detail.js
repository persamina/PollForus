PollForUs.Views.PollDetail = Backbone.View.extend({
  template: JST["polls/detail"],

  initialize: function() {
    this.listenTo(PollForUs.allAnswers, "add remove change", this.render);
    this.listenTo(PollForUs.polls, "add remove, change", this.render);
  },
  events: {
    "click .delete-poll": "deletePoll",
  },

  colorOptions: ["#D70060", "#3E7FC0", "#5EC010", "#01A4A4", "#132B42",
                 "#8F3790", "#E54028", "#32742C", "#D0D102", "#113F8C",
                 "#F18D05", "#FD1312", "#3F5514" ],

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
    var pollToDelete = this.collection.get(pollId);
    pollToDelete.destroy({
      wait:true,
      success: function(model, response) {
        model.get("questions").forEach(function(question) {
          PollForUs.allAnswers.remove(question.get("answers").models);
        });
      }


});
