PollForUs.Models.Question = Backbone.Model.extend({  
  parse: function(respAttrs, options) {
    respAttrs.answers = new PollForUs.Collections.Answers(respAttrs.answers);
    return respAttrs;
  }

})
