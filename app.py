from flask import Flask, render_template_string, request, redirect, flash, url_for
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt

app = Flask (__name__)
app.secret_key = 'supersecretkey'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'estoque'

mysql = MySQL(app)
bcrypt = Bcrypt(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
       email = request.form['email']
       password = request.form['password']

       cur = mysql.connection.cursor()
       cur.execute("SELECT * FROM usuario WHERE email = %s AND password = %s", (email, password))
       user = cur.fetchone()
       cur.close()

       if user:
            return redirect(url_for('almox'))
       else:
            return redirect(url_for('login'))

    return render_template_string(open('login.html').read())

@app.route('/signup', methods=['GET', 'POST'])
def signup():
 if request.method == 'POST':
     email = request.form['email']
     name = request.form['name']
     password = request.form['password']     

     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

     cur = mysql.connection.cursor()
     cur.execute("INSERT INTO usuario (email, name, password) VALUES (%s, %s, %s)", (email, name, hashed_password))
     mysql.connection.commit()
     cur.close()

     flash('Conta criada com sucesso!')
     return redirect(url_for('home'))
 
 return render_template_string(open('signup.html').read())

@app.route('/almox')
def almox():
 
 return render_template_string(open('almox.html').read())

if __name__ == '__main__': 
    app.run (debug=True, port=5001)