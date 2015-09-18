Todos = new Mongo.Collection("todos");

if(Meteor.isClient){

  Template.todos.helpers({
    "todo": function() {
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.todoItem.helpers({
    "checked": function() {
      var isCompleted = this.completed;

      if(isCompleted){
        return "checked";
      } else {
        return "";
      }
    }
  });

  Template.todosCount.helpers({
    "totalTodos": function() {
      return Todos.find().count();
    },

    "completedTodos": function() {
      return Todos.find({completed: true}).count();
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

    'change [type="checkbox"]': function(event) {
      var documentId = this._id;
      var isCompleted = this.completed;

      if (isCompleted){
        Todos.update(documentId, {$set: {completed: false }});
        console.log("Task marked as incomplete.");
      } else {
        Todos.update(documentId, {$set: {completed: true }});
        console.log("Task marked as complete.");
      }
    },

    'keyup [name="todoItem"]': function(event) {
      var todoName = $(event.target).val();
      var documentId = this._id;

      console.log(event.which);

      if(event.which == 13){
        Todos.update({_id: documentId}, {$set: {name: todoName} });
        $(event.target).blur();
      }

    }
    /* Salva alterações no TAB
    'keypress [name="todoItem"]': function(event) {
      var todoName = $(event.target).val();
      var documentId = this._id;

      console.log(event.which);

      if(event.which == 0){
        //Todos.update({_id: documentId}, {$set: {name: todoName} });
        $(event.target).blur();
      }
    }*/
  });

}

if(Meteor.isServer){

}