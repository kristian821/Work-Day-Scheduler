var events = {};

let currentTime = moment().hour();

var createEventEl = function() {
    // create elements for event
    var textInput = $("<textarea>").addClass("form-control");

    var textEl = $(textInput).val();

    var currentText = $("li.time-block").text().trim();

    currentText.replace(textEl);

    var parentEl = $(this).closest("ul.list-group")
    var deadline = $(parentEl).attr("id");
    var dueDate = moment("date", "L").set("hour", deadline);
    
    textInput.trigger("focus");
};

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
    
    if (!events) {
        events = {
            textEl: [],
            dueDate: []
        };
    }

    $.each(events, function(subArr) {
        subArr.array.forEach(function(event) {
            createEventEl(event.text, events.time);
        });
    });
};

saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};

var checkTime = function(el) {
    var parentEl = $(el).closest("ul");
    console.log(parentEl);
    var deadline = $(parentEl).attr("id");
    console.log(deadline);
    var dueDate = moment("date", "L").set("hour", deadline);
    console.log(dueDate);

    if (currentTime.isAfter(dueDate)) {
        $(el).addClass("past");
    } else if (currentTime.isSame(dueDate)) {
        $(el).addClass("present");
    } else if (currentTime.isBefore(dueDate)) {
        $(el).addClass("future");
    }
    
};



loadEvents();
$(".time-block").on("click", "li", createEventEl);
$("li.time-block").on("change", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);

    setInterval(function() {
        $("li.time-block").each(function(index, el) {
            checkTime(el);
        });
    }, 1000);
});
$(".save-btn").on("click", saveEvents);

