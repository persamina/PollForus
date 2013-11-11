PollForUs.Models.Answer = Backbone.Model.extend({  
  urlRoot: "/answers",
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
