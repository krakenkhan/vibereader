from cs50 import SQL
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, session, jsonify , json
from flask_session import Session
from google import genai
import os

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# configuring the database
db = SQL('sqlite:///words.db')
global WORDS

#defining variable to store entered text globally
@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        session['words'] = request.form.get("text")
        return render_template("read.html", words = session['words'])
# Define route for the homepage
@app.route("/read", methods = ["GET", "POST"])
def hello():
    WORDS = session['words']
    # Get the text input from the FORM
    if WORDS != "":
        # Render the read.html template   
        return render_template("read.html",words = WORDS)
    else:
        return render_template("index.html")

# Define route to receive data via POST request    
@app.route('/receive_data', methods=['POST'])
def receive_data():

    # Get the JSON data from the request
    sent_data = request.json 

    # Print the received data
    print(sent_data)
    # Insert the received data into the database
    try:
        db.execute("INSERT INTO words(word, trans) VALUES(?,?)",sent_data['word'], sent_data['trans'])    
        return jsonify(sent_data)
    except:   # Respond with a JSON message
        return jsonify({'message' : 'already exists'})
    
    # Respond with a JSON message


# Define route for the vocabulary trainer
@app.route('/vocab', methods=['POST', 'GET'])
def vocab_trainer():
   

     # Render the srs.html template with the list of words
    return render_template("srs.html")


# Define route to start the application
@app.route('/start')
def start():

     # Retrieve all words from the database
    words = db.execute("SELECT * FROM words ORDER BY rank DESC;")
    return jsonify(words)


#Define route that changes the rank of the Keywords
@app.route('/alter', methods=['POST','GET'])
def alter():
    data = request.json
    print(data)
    id = int(data['id'])
    if id in {1,2,3}:
        check = db.execute("UPDATE words SET rank = ? WHERE  word = ? AND trans = ?",id, data['word'], data['trans'])
        if check:
            newdict = db.execute("SELECT * FROM words ORDER BY rank DESC;")
            return jsonify(newdict)
        else:
            return jsonify("error")
    if id == 4:
        check = db.execute("DELETE FROM words WHERE word = ? AND trans = ?",data['word'],data['trans'])
        if check:
            newdict = db.execute("SELECT * FROM words ORDER BY rank DESC;")
            return jsonify(newdict)
        else:   
            return jsonify("error")





#a route that handle Prompts
@app.route('/proompts',methods=['POST','GET'])
def proompts():
    redata = request.json
    load_dotenv()
    key = os.getenv("API_KEY")
    # print(api_key)
    client = genai.Client(api_key=key)
    prompt = redata['prompt']
    word = redata['word']
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents= prompt + word
    )
    # print(response.text)
    return jsonify(response.text)
    # return jsonify("great")