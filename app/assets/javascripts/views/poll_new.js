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
    var newView = this;
    event.preventDefault();
    var newPollValues = $(event.currentTarget).serializeJSON().poll;
    this.model = new PollForUs.Models.Poll(newPollValues, {parse: true} );
    
    this.collection.create(this.model, {
      success: function(poll) {
        debugger
        newView.model = poll;

      },
      error: function(poll) {
      }
    });
    
    Backbone.history.navigate("", {trigger: true});
  },

  addQuestion: function(event) {
    event.preventDefault();
    var numQuestions = $(".questions").children().length;
    var renderedContent = this.addQuestionTemplate({id: (numQuestions)});
    $(".questions").append(renderedContent);
  },

  addAnswer: function(event) {
    event.preventDefault();
    var addAnswerButton = $(event.currentTarget);
    var qId = addAnswerButton.data().qId;
    var answersString = ".answers#q"+qId;
    var answersDiv = $(answersString);
    var numAnswers = answersDiv.children().length;
    
    var renderedContent = this.addAnswerTemplate({
      qId: qId,
      aId: (numAnswers)
    });
    answersDiv.append(renderedContent);
    console.log("add answer");

  },

});
