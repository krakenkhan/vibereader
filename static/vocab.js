// ## VOCAB TOOL ## 

var current = 0;
const buttons = document.getElementById("further");
const under = document.getElementById("question");
var words;

// makes the tool run
function start_tool(wordsreceived){
    //first word being shown
    //calculating starting and ending values
    words = wordsreceived;
    const ques = document.getElementById("ques");
    const trans = document.getElementById("trans"); 
    if (words != ""){   

        ques.innerHTML = `${words[current].word}`;
        trans.innerHTML = `?`;
        // Example
        var sedata = {
            word : words[current].word,
            prompt : "For this given word concatenated at the end of this promot. display an example in the language that this word most probably belongs to. output JUST the example and not a single extra word." 
        }
        $.ajax({
            url: 'http://127.0.0.1:5000/proompts',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(sedata),
            success: function(response){
                var ex = document.getElementById("example");
                ex.innerHTML = `${response}`;
                // console.log('success')
            },
            error: function(){
                console.log('error');
            }
        });

        // An event that reaveales the current translation when clicked.
        trans.addEventListener("click", function(){
                trans.innerText = `${words[current].trans}`;
                under.innerHTML = `Did you remember?`;
                // show the buttons of choice:
                buttons.classList.remove("special");
            });       
        }
        else{
            ques.innerHTML = "No words"
            trans.innerHTML = "Left"
            buttons.classList.add("special");
            under.innerHTML = `Add more words to review`;
            var ex = document.getElementById("example");
            ex.classList.add("special");
        }
    }

 //When 1. Yes is clicked update the rank of the word in the database using ajax request.
 $('#1').click(function alter_rank_to1(){
    // console.log(words[current].trans);
    const sendData = {
        id : 1,
        word: words[current].word,
        trans: words[current].trans
    }
    $.ajax({
        url: 'http://127.0.0.1:5000/alter',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response){
            start_tool(response);
            buttons.classList.add("special");
            under.innerHTML = `Guess the meaning and then click on the translation.`;
        },
        error: function(){
            console.log('error');
        }
    });
});


 //When 1. Yes is clicked update the rank of the word in the database using ajax request.
 $('#2').click(function alter_rank_to2(){
    // console.log(words[current].trans);
    const sendData = {
        id : 2,
        word: words[current].word,
        trans: words[current].trans
    }
    $.ajax({
        url: 'http://127.0.0.1:5000/alter',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response){
            start_tool(response);
            buttons.classList.add("special");
            under.innerHTML = `Guess the meaning and then click on the translation.`;
        },
        error: function(){
            console.log('error');
        }
    });
});

$('#3').click(function alter_rank_to3(){
    // console.log(words[current].trans);
    const sendData = {
        id : 3,
        word: words[current].word,
        trans: words[current].trans
    }
    $.ajax({
        url: 'http://127.0.0.1:5000/alter',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response){
            start_tool(response);
            buttons.classList.add("special");
            under.innerHTML = `Guess the meaning and then click on the translation.`;
        },
        error: function(){
            console.log('error');
        }
    });
});

$('#4').click(function alter_rank_to_delete(){
    // console.log(words[current].trans);
    const sendData = {
        id : 4,
        word: words[current].word,
        trans: words[current].trans
    }
    $.ajax({
        url: 'http://127.0.0.1:5000/alter',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response){
            start_tool(response);
            buttons.classList.add("special");
            under.innerHTML = `Guess the meaning and then click on the translation.`;
        },
        error: function(){
            console.log('error');
        }
    });
});


const vocab = document.getElementById("start");
vocab.addEventListener("click", function(){
    $.ajax({
    url: 'http://127.0.0.1:5000/start',
        success: function(response){
            // function to start the tool
            start_tool(response);
            return;
        },
        error: function(error){
            console.error(error);
        }
    });
    //hide the start button after use:
    vocab.classList.add("special");
});

