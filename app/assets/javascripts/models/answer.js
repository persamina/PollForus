PollForUs.Models.Answer = Backbone.Model.extend({  
  urlRoot: "/answers",

  validate: function(attrs, options) {
    if(attrs.body.length < 1) {
      return "Answer can't be blank!";
    }
  },
  // parse: function(respAttrs, options) {
    // respAttrs.answer_choices = new PollForUs.Collections.AnswerChoices(respAttrs.answer_choices );
    // return respAttrs;
  //},
  toJSON: function() {
    var data = _.extend({}, this.attributes);
    delete data.answer_choices;
    return data;
  }


})
