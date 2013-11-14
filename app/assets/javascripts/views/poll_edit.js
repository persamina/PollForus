PollForUs.Views.PollEdit = Backbone.View.extend({
  template: JST["polls/new_edit"],
  addQuestionTemplate: JST["polls/add_question"],
  addAnswerTemplate: JST["polls/add_answer"],
  events: {
    "submit .new-poll-form": "submit",
    "click .add-question": "addQuestionButton",
    "click .delete-question": "deleteQuestion",
    "click .add-answer": "addAnswerButton",
    "click .delete-answer": "deleteAnswer",
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
    newPollValues["id"] = this.model.id;
       
    newPollValues.questions = this.parseQuestions(newPollValues.questions, this.model.id);

    var updatedPoll = new PollForUs.Models.Poll(newPollValues, {parse: true} );
    var validationErrors = this.validatePoll(updatedPoll);

    if (validationErrors.length < 1) {
      this.model.set(updatedPoll );
      this.model.save({}, {
        wait: true,
        success: function(poll) {
          editView.model.get("questions").forEach(function(question) {
            question.get("answers").forEach(function(answer) { 
              var currentAnswer = PollForUs.allAnswers.get(answer.id);
              if(currentAnswer) {
                currentAnswer.set(answer);
              } else {
                PollForUs.allAnswers.add(answer);
              }
            });
          });
          editView.model.trigger("newSuccessMessage", {messages: ["The poll '"+ editView.model.get("name") + "' was successfully Updated!"]});
        },
        error: function(model) {
        },

      });

      Backbone.history.navigate("#/" + this.model.id, {trigger: true});
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
    var questionDiv = $(".question#q"+qId);
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

  addAnswerButton: function(event) {
    event.preventDefault();
    var addAnswerButton = $(event.currentTarget);
    var qId = addAnswerButton.data().qId;
    var answer = new PollForUs.Models.Answer();
    this.addAnswer(qId, answer);
  },

  addAnswer: function(qId, answer) {
    var answersDiv = this.$el.find(".answers#q"+qId);

    var numAnswers = answersDiv.children().length;
    var aId = answer.id;
    if(!aId) {
      aId = numAnswers;
    }

    var renderedContent = this.addAnswerTemplate({
      qId: qId,
        aId: aId,
        answer: answer
    });
    answersDiv.append(renderedContent);
    var questionDiv = $(".question#q"+qId);
    questionDiv.find(".answer#a"+aId).hide();
    questionDiv.find(".answer#a"+aId).fadeIn(500);

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

  parseQuestions: function(questions, pollId) {
    var parsedQuestions = [];
    questions = this.createDataHash(questions, undefined);
    for (var key in questions) {
      if (questions.hasOwnProperty(key)) {
        questions[key]["poll_id"] = pollId;
        var question = this.model.get("questions").get(key);
        questions[key]["answers"] = this.parseAnswers(questions[key].answers, question);
        if (question) {
          questions[key]["id"] = question.id;
        }
        parsedQuestions.push(questions[key]);
      }
    }
    return parsedQuestions;
  },

  parseAnswers: function(answers, question) {
    var parsedAnswers = [];
    answers = this.createDataHash(answers, undefined);
    for (var key in answers) {
      if (answers.hasOwnProperty(key)) {
        if (question) {
          answers[key]["question_id"] = question.id;
          var answer = question.get("answers").get(key);
        }
        if (answer) {
          answers[key]["id"] = answer.id;
        } 
        parsedAnswers.push(answers[key]);
      }
    }
    return parsedAnswers;
  },

  createDataHash: function(array, skipValue) {
    var currentQuestionId = 0;
    var data = {};
    if (array && array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] != skipValue) {         
          data[currentQuestionId] = array[i];
        }
        currentQuestionId++;
      }
    }
    return data;
  },

});
