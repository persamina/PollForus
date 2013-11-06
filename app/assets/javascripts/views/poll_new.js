PollForUs.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new"],
  addQuestionTemplate: JST["polls/add_question"],
  addAnswerTemplate: JST["polls/add_answer"],
  events: {
    "submit .new-poll": "submit",
    "click .add-question": "addQuestion",
    "click .add-answer": "addAnswer"
  },
  
  render: function() {
    var renderedContent = this.template({
      poll: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    console.log("form submitted");
  },

  addQuestion: function(event) {
    event.preventDefault();
    var numQuestions = $(".questions").children().length;
    var renderedContent = this.addQuestionTemplate({id: (numQuestions+1)});
    $(".questions").append(renderedContent);
  },

  addAnswer: function(event) {
    event.preventDefault();
    var aa = $(event.currentTarget);
    var qId = aa.data().qId;
    var answersString = ".answers#q"+qId;
    var answersDiv = $(answersString);
    var numAnswers = answersDiv.children().length;
    
    var renderedContent = this.addAnswerTemplate({
      qId: qId,
      aId: (numAnswers+1)
    });
    answersDiv.append(renderedContent);
    console.log("add answer");

  },


});
