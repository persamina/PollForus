PollForUs.Views.PollEdit = Backbone.View.extend({
  template: JST["polls/new_edit"],
  addQuestionTemplate: JST["polls/add_question"],
  addAnswerTemplate: JST["polls/add_answer"],
  events: {
    "submit .new-poll-form": "submit",
    "click .add-question": "addQuestionButton",
    "click .add-answer": "addAnswerButton"
  },
  
  render: function() {
    var editView = this;
    var renderedContent = this.template({
      poll: this.model,
      title: "Edit Poll",
      btnText: "Update Poll!"
    });
    this.$el.html(renderedContent);
    this.model.get("questions").forEach(function(question) {
      editView.$el.find(".questions").html(editView.addQuestion(question));
      var qId = question.id;
      question.get("answers").forEach(function(answer){ 
        editView.addAnswer(qId, answer);
      });
    });

    return this;
  },
  
  submit: function(event) {
    var editView = this;
    event.preventDefault();
    var newPollValues = $(event.currentTarget).serializeJSON().poll;
    this.updateAndCreateModels(newPollValues);
    debugger;
    this.model = new PollForUs.Models.Poll(newPollValues, {parse: true} );
    
    
    this.collection.create(this.model, {
      wait: true,
      success: function(poll) {
        editView.model = poll;
        editView.model.get("questions").forEach(function(question) {
          PollForUs.allAnswers.add(question.get("answers").models);
        });
      },
      error: function(poll) {
      }
    });
    
    Backbone.history.navigate("", {trigger: true});
  },

  addQuestionButton: function(event) {
    event.preventDefault();
    this.addQuestion();
  },
  addQuestion: function(question) {
    if (!question) {
      var question = new PollForUs.Models.Question();
    }
    var qId = question.id
    if(!question.id) {
      qId = $(".questions").children().length;
    }

    var renderedContent = this.addQuestionTemplate({
      id: qId,
      question: question 
    });

    this.$el.find(".questions").append(renderedContent);
  },

  addAnswerButton: function(event) {
    event.preventDefault();
    var addAnswerButton = $(event.currentTarget);
    var qId = addAnswerButton.data().qId;
    var answer = new PollForUs.Models.Answer();
    this.addAnswer(qId, answer);
  },

  addAnswer: function(qId, answer) {
    var answersString = ".answers#q"+qId;
    var answersDiv = this.$el.find(answersString);

    var numAnswers = answersDiv.children().length;
    var aId = answer.id;
    if(!answer) {
      aId = numAnswers;
    }
    
    var renderedContent = this.addAnswerTemplate({
      qId: qId,
      aId: aId,
      answer: answer
    });
    answersDiv.append(renderedContent);

  },

  updateAndCreateModels: function(data) {
    var questions = this.createDataHash(data.questions, undefined);
    delete data.questions;
    debugger
    this.model.save(data);
    questions.forEach(function(question) {

      console.log(question);

      
    });
    
    
    
  },

  createDataHash: function(array, skipValue) {
    var currentQuestionId = 0;
    var data = {};
    for (var i = 0; i < array.length; i++) {
      if (array[i] != skipValue) {         
        data[currentQuestionId] = array[i];
      }
      currentQuestionId++;
    }
    return data;
  },

});
