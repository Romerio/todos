Todos = new Mongo.Collection("todos");

if(Meteor.isClient){
  Template.todos.helpers({
    "todo": function() {
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.addTodo.events({
    "submit form": function(event) {
      event.preventDefault();
      var todoName = $('[name="todoName"]').val();
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date()
      });
      $('[name="todoName"]').val('');
    }
  });

  Template.todoItem.events({
    "click .delete-todo": function(event) {
      event.preventDefault();
      var documentId = this._id;

      var confirmDelete = window.confirm("Delete this task?");

      if (confirmDelete)
        Todos.remove({_id: documentId});
    },

    'keyup [name="todoItem"]': function(event) {
      var todoName = $(event.target).val();
      var documentId = this._id;

      if(event.which == 13){
        Todos.update({_id: documentId}, {$set: {name: todoName} });
      } else if(event.which == 27){

      }
    },

    'keypress [name="todoItem"]': function(event) {
      var todoName = $(event.target).val();
      var documentId = this._id;

      if(event.which == 0){
        Todos.update({_id: documentId}, {$set: {name: todoName} });
      }
    }
  });

}

if(Meteor.isServer){

}