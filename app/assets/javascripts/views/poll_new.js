PollForUs.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new_edit"],
  addQuestionTemplate: JST["polls/add_question"],
  addAnswerTemplate: JST["polls/add_answer"],
  events: {
    "submit .new-poll-form": "submit",
    "click .add-question": "addQuestion",
    "click .delete-question": "deleteQuestion",
    "click .add-answer": "addAnswer",
    "click .delete-answer": "deleteAnswer",
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
    var validationErrors = this.validatePoll(this.model);
    
    if(validationErrors.length < 1) {
      this.collection.create(this.model, {
        wait: true,
        success: function(poll) {
          newView.model = poll;
          newView.model.get("questions").forEach(function(question) {
            PollForUs.allAnswers.add(question.get("answers").models);
          });
          newView.collection.trigger("newSuccessMessage", {messages: ["Poll Successfully Created!"]});
        },
        error: function(poll) {
        }
      });

      Backbone.history.navigate("", {trigger: true});
    } else {
      var renderedContent = PollForUs.Store.addErrorsTemplate({
        errors: validationErrors
      });
      this.$el.find(".errors").html(renderedContent);
    }
  },

  validatePoll: function(poll) {
    var errors = [];
    if (!poll.isValid()) {  
      errors.push(poll.validationError);
    }
    if(poll.get("questions")) {
      poll.get("questions").forEach(function(question) {
        if(!question.isValid()) {
          errors.push(question.validationError);
        }
        if(question.get("answers")) {
          question.get("answers").forEach(function(answer) {
            if(!answer.isValid()) {
              errors.push(answer.validationError);
            }
          });
        }
      });
    }
    return errors;
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
    var questionDiv = $(".question#q"+numQuestions);
    questionDiv.hide();
    questionDiv.fadeIn(500);
  },

  deleteQuestion: function(event) {
    event.preventDefault();
    var iconClicked = $(event.target);
    var questionId = iconClicked.parent().data("questionId");
    if(this.model.get("questions")) {
      var questionToDelete = this.model.get("questions").get(questionId);
    }
    if (questionToDelete) {
      questionToDelete.destroy({
        wait:true,
        success: function(model, response) {
          PollForUs.allAnswers.remove(model.get("answers").models);
        }
      });
    } 
    $(".question#q"+questionId).fadeOut( "medium", function() {
      $(".question#q"+questionId).remove();
    });
    

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
    var questionDiv = $(".question#q"+qId);
    questionDiv.find(".answer#a"+numAnswers).hide();
    questionDiv.find(".answer#a"+numAnswers).fadeIn(500);
  },

  deleteAnswer: function(event) {
    event.preventDefault();
    var iconClicked = $(event.target);
    var questionId = iconClicked.parent().data("questionId");
    var answerId = iconClicked.parent().data("answerId");

    if(this.model.get("questions")) {
      var question = this.model.get("questions").get(questionId);
    }
    if (question) {
      var answer = question.get("answers").get(answerId);
      if (answer) {
        answer.destroy({
          wait:true,
          success: function(model, response) {
            PollForUs.allAnswers.remove(model);
          }
        });
      } 
    } 
    var questionDiv = $(".question#q"+questionId);
    questionDiv.find(".answer#a"+answerId).fadeOut("medium", function() {
      questionDiv.find(".answer#a"+answerId).remove();
    });
  },


});
