PollForUs.Views.PollDetail = Backbone.View.extend({
  initialize: function() {
    this.listenTo(PollForUs.allAnswers, "add remove change", this.render);
  },
  colorOptions: ["#D70060", "#3E7FC00", "#5EC010", "#01A4A4", "#132B42", "#8F3790", "#E54028", "#32742C", "#D0D102", "#113F8C", "#F18D05", "#FD1312", "#3F5514" ],
  template: JST["polls/detail"],

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
});
