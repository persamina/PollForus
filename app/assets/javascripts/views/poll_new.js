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
    var newPollValues = $(event.currentTarget).serializeJSON().poll;
    this.model = new PollForUs.Models.Poll(newPollValues, {parse: true} );
    // this.model["questions"] = new PollForUs.collection.Questions(newPollValues.questions);
    // this.model.set(newPollValues.poll);
    
    this.collection.create(this.model, {
      success: function(poll) {
        console.log("success adding");
      },
      error: function(poll) {
        console.log("NOT success adding");
      }
    });
    
    console.log("form submitted");
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
