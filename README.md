# IMMERSIVE READER
#### Video Demo:  [Demonstration](https://youtu.be/tdVWVoO41Gs)
#### Description:
This Project is a website that allows the user to paste text in a certain language and then read it while having the option to translate parts of it, which later can be learned through a vocab trainer included in the website. This project is inspired by a Browser Extention called [Readlang](https://readlang.com/de/dashboard).

Immersive Reader is built with the help of following frameworks and programming Languages:
1. Flask(Python Framework for backend)
2. Javascript
3. HTML/CSS.
4. Jquery
5. SQLITE
6. SASS

The index.html page of Immersive Reader allows the user to paste Text in a textbox. If no text is entered the page never progresses forward. After entering a text the website leads you to it's second page where you are shown the text you just entered. The text entered before gets sent to the frontend using flask framework that is the backend of this website. Where using JS every word of the Text is displayed as a seperate span element making it easier to translate and select. 

This second page, read.html, allows the user to translate any word by simple clicking on it. The translation is provided through Gemini API which is called in the backend. When a text is clicked the script.js file which is the javascript file for this page calls an AJAX request to a route in the backend, sending in the word that must be translated, along with the prompt for how it should be shown. 

This Flask route calls the Gemini API using the API Key provided by google Gemini. This API key is stored in an .env file that is not uploaded to the github for security reasons. Earlier I started with another API that was called directly on the front end but later changed that to a backend based API calling. Because I learned that calling an API on the front end is generally a security risk. It exposes confidential information like the API Key.

Once the API returns an answer it is returened to the AJAX request(that was made using JQUERY) where it is then shown above the word that was clicked on. Every word is  printed with an invisible span element directly above it which gets poppualated with the translation once the word is clicked.

To remove a translation simply click back on the word or its translation. These functions are also defined in the script.js

The word that is clicked gets stored in a sqllite database, words.db, for further learning. The goal of this website is not just to translate words but to "immerse" you in a text where you only translate the words you really don't know. This technique helps language learners to learn the words that are new to them while still challenging their brain to remember the words they are familiar with.

The user can also translate a sentence/sentences/phrase/phrases. multiple words can be selected by simply highlighting them with your mouse this runs an event in script.js which combines all of the selected span elements into a string and then sends it to the same route for being translated. multiple words translations does not get saved in the database.

This page can be improved by adding an option for the user to choose, which language he wants the text to be converted into. Further Styling of the page can be improved by making the text appear like being written in a book.

The next page allows the user to learn vocabulary, i.e. all the words they previously selected. One word with a unique translation is only saved once in the database.

The Vocab Trainer,srs.html, shows the user one of the words he recently translated. The user is then asked to guess what it means before revealing the translation.To help the user,an example is shown that uses the word in a sentence to provide context. for showing the example, translating a single word, translating multiple words. all uses the same API route hence the same function is reused.

One the translation is revealed the user is given the choice to determine if he remembered the meaning or not. 3 different ranks can be given to the word that changes the order in which this word will be shown again. That means if the user clicks on "not at all" the word is given the rank of 3 which means it will be repeated very soon and vice versa for if they click on "Yes". This is done adding a Descending sort in the SQL query that is called after every word. By default the word has a rank of 4 which means newly selected words will be shown first. once the user gets familiar with a word it is very easy to delete the word from the database. The website is designed not to annoy the user with the same words again and again. Hence clicking on the "delete" button instantly deletes the word from the database. All of this funtionalities are defined in the js file vocab.js

This spaced Repetition System can be further Improved by adding sounds and animations just like in [Duolingo](https://www.duolingo.com/).


The frontend of the website was first done in a static.css file but later was moved to a custom.scss file which uses SASS to write css. I used SASS because it allowed me to easliy manipulate my css code, add variables and change values. the node_modules folder was installed only for using SASS with this project. 


the .gitignore file ignores a .env file which contains the API Key for the Gemini API. this is done to protect leakage of the API KEY which shouldn't be sent to users.

