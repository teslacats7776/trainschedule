// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


var frequency = 0; 
var firstTrain = 0;


      $("#submit-emp").on("click", function() {
          event.preventDefault();

var name = $("#train-name").val().trim();
 var dest = $("#train-dest").val().trim();
 firstTrain = moment($("#train-startDTTM").val().trim(), "HH:mm").format("HH:mm");
 frequency = parseInt($("#train-freq").val().trim());



 var diffTime = moment().diff(moment(moment(firstTrain, "hh:mm")), "minutes");
 var tRemainder = diffTime % frequency;
 var minutesTillTrain = frequency - tRemainder;
 var nextTrain = moment().add(minutesTillTrain, "minutes");
 nextTrain = moment(nextTrain).format("HH:mm");

// Save new value to Firebase
var newPostRef = database.ref().push({

 name: name,
 dest: dest,
 firstTrain: firstTrain,
 frequency: frequency,
 nextTrain: nextTrain,
minutesTillTrain: minutesTillTrain
 });

 var postID = newPostRef.key;
console.log (postID);
 name = $("#train-name").val('');
 dest = $("#train-dest").val('');
 firstTrain = $("#train-startDTTM").val('');
 frequency = $("#train-freq").val('');


})


// function monthDiff(dateFrom, dateTo) {
//  return dateTo.getMonth() - dateFrom.getMonth() + 
//    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
// }



database.ref().on("child_added", function(data) {

var row = $("<tr>");
var trName = $("<td>").text(data.val().name);
var trDest = $("<td>").text(data.val().dest);
//var trDttm = $("<td>").text(data.val().stDttm);
  var trDttm = $("<td>").text(moment(data.val().stDttm).format('HH:mm'));
var trFreq = $("<td>").text(data.val().frequency);
  var nextTrain = $("<td>").text(data.val().nextTrain);
  var minutesTillTrain = $("<td>").text(data.val().minutesTillTrain);
// var currentTime = moment().format('HH:mm')
// var today = moment (new Date ());

  
row.append(trName);
row.append(trDest);
row.append(trFreq);
row.append(nextTrain);
row.append(minutesTillTrain);

//row.append(empB)
$("tbody").append(row);


}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});






