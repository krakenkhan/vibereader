
// a function that empties the fetched result
function empty(id){
  document.getElementById(id).innerText = "";  
} 

function display(){
  words = document.getElementsByClassName("special")[0].innerHTML;
  l = words.length;
  
  display = document.getElementById("display");
  tempword = words[0];
  for( i = 1, j=0; i < l; i++){
    // console.log(words[i])
    if(words[i] != " "){ 
      tempword = tempword.concat(words[i]);
    }
    // onClick="start_selecting(${j}
    if(words[i] == " " || words[i] == "." || words == "?" || words == "!"){
      display.innerHTML += `<p class="clickableText" id="${j}">

        <span class="answer mb-0 bg-danger text-white" id="a${j}">
        </span>
      ${tempword}
      </p> `;
      // console.log(tempword)
      tempword = "";
      j++;
    }
  };
  start = document.getElementById("start");
  start.classList.add("special");
};

//deleting the translation when clicked
document.addEventListener("click", async event => {
  const targetId = event.target.id;
  const answer = document.getElementById(`${event.target.id}`);
  if (answer != null){
  var test = answer.classList[0];
  if (test == "answer"){
    if(answer.innerHTML !=""){
      empty(`${targetId}`)
    }
  }
  }
  else{
    return;
  }
});

// variable that stores the new translations

//get the answer
    document.addEventListener("click", async event => {
      const targetWord = event.target.innerText;
      var test = event.target.className;
      var answer = document.getElementById(`a${event.target.id}`);
      // console.log(answer);
      var sdata = {
        word : `${targetWord}`,
        prompt: "Translate the word attached to the end of this prompt in the language that this word most probably belongs too Output nothing but just the translation nothing else."
      }
      if(test == "clickableText"){ 
        if(answer.innerText == "" ){
          $.ajax({
            url : `http://127.0.0.1:5000/proompts`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(sdata),
            success: function(response){
              var translation = response;
              answer.innerText = translation.trim();
              const sentWord = {
                word : targetWord,
                trans: answer.innerText
              }
              console.log(sentWord)
              $.ajax({
                url: 'http://127.0.0.1:5000/receive_data',  
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(sentWord),
                success: function(suc) {
                    console.log(suc);
                },
                error: function(error) {
                    console.error(error);
                }
              });

            },
            error: function(response){
              console.log("error")
            }
          });
        // Prepare the data to be sent to the server
         
      }
        else{
          answer.innerText="";
        }
      }  
     
  });

  $("#start").on("click", function (){  
      
    // if selecting multiple words
    document.addEventListener("mouseup", async () => {
      var selectedText = window.getSelection();

      //selecting the id of the selected text
      var selectId = selectedText.focusNode.parentElement.id;

      // getting the text and removing line breaks
      selectedText = selectedText.getRangeAt(0).toString();
      answer = document.getElementById(`a${selectId}`);
      sdata = {
        word : `${selectedText}`,
        prompt : "Translate the following sentences to this Prompt from the language they are most probably are to English output nothing but just the translation and nothing more not a single word more."
      }
      if (selectedText != ""){
          $.ajax({
            url : `http://127.0.0.1:5000/proompts`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(sdata),
            success: function(response){
              answer.innerHTML = `${response}`;
              document.getSelection().removeAllRanges()

            },
            error: function(response){
              console.log("error")
            }
          });
          }
        });
    });