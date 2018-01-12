
from flask import Flask, render_template, jsonify, redirect


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# Default route to render index.html
@app.route("/")
def default():

    return render_template("index.html")
    # Default route to render index.html

@app.route("/d3")
def data():

    return render_template("d3.html")



# Initiate the Flask app
if __name__ == '__main__':
    app.run(debug=True)
