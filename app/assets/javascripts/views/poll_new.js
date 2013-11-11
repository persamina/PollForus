PollForUs.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new_edit"],
  addQuestionTemplate: JST["polls/add_question"],
  addAnswerTemplate: JST["polls/add_answer"],
  events: {
    "submit .new-poll-form": "submit",
    "click .add-question": "addQuestion",
    "click .add-answer": "addAnswer"
  },
  
  render: function() {
    var renderedContent = this.template({
      poll: this.model,
      btnText: "Create Poll!",
      title: "Create a New Poll"
    });
    this.$el.html(renderedContent);

    return this;
  },
  
  submit: function(event) {
    var newView = this;
    event.preventDefault();
    var newPollValues = $(event.currentTarget).serializeJSON().poll;
    this.model = new PollForUs.Models.Poll(newPollValues, {parse: true} );
    
    this.collection.create(this.model, {
      wait: true,
      success: function(poll) {
        newView.model = poll;
        newView.model.get("questions").forEach(function(question) {
          PollForUs.allAnswers.add(question.get("answers").models);
        });
      },
      error: function(poll) {
      }
    });
    
    Backbone.history.navigate("", {trigger: true});
  },

  addQuestion: function(event) {
    event.preventDefault();
    var numQuestions = $(".questions").children().length;
    var question = new PollForUs.Models.Question();
    var renderedContent = this.addQuestionTemplate({
      id: (numQuestions),
      question: question 
    });
    $(".questions").append(renderedContent);
  },

  addAnswer: function(event) {
    event.preventDefault();
    var addAnswerButton = $(event.currentTarget);
    var qId = addAnswerButton.data().qId;
    var answersString = ".answers#q"+qId;
    var answersDiv = $(answersString);
    var numAnswers = answersDiv.children().length;
    var answer = new PollForUs.Models.Answer();
    
    var renderedContent = this.addAnswerTemplate({
      qId: qId,
      aId: (numAnswers),
      answer: answer
    });
    answersDiv.append(renderedContent);
  },

});
