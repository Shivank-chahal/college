"""
Vivek College Bijnor - College Advertisement Website
Senior Expert Development - Python Flask Backend
"""
from flask import Flask, render_template
import os

app = Flask(__name__, 
            template_folder='templates',
            static_folder='static')

@app.route('/')
def index():
    """Serve the main college advertisement page."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
