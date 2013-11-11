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
    newPollValues["id"] = this.model.id;
       
    newPollValues.questions = this.parseQuestions(newPollValues.questions, this.model.id);

    var updatedPoll = new PollForUs.Models.Poll(newPollValues, {parse: true} );
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
      },
      error: function(model) {

        console.log("error updating");
      },

    });
    
    Backbone.history.navigate("#/polls/" + this.model.id, {trigger: true});
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
