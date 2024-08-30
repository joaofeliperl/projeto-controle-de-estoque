from flask import Flask, render_template_string, request, redirect, flash, url_for
from flask_mysqldb import MySQL

app = Flask (__name__)
app.secret_key = 'supersecretkey'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'estoque'

mysql = MySQL(app)

@app.route('/')
def home():
    return render_template_string(open('login.html').read())

@app.route('/signup', methods=['GET', 'POST'])
def signup():
 if request.method == 'POST':
     email = request.form['email']
     name = request.form['name']
     password = request.form['password']

     print(f"Email: {email}, Nome: {name}, Senha: {password}")  # Adiciona logs para verificar os dados

     try:
         cur = mysql.connection.cursor()
         cur.execute("INSERT INTO usuario (email, name, password) VALUES (%s, %s, %s)", (email, name, password))
         mysql.connection.commit()
         cur.close()

         flash('Conta criada com sucesso!')
         return redirect(url_for('home'))
     except Exception as e:
         print(f"Erro ao inserir no banco de dados: {e}")
         flash('Erro ao criar a conta.')
         return redirect(url_for('signup'))
 
 return render_template_string(open('signup.html').read())


if __name__ == '__main__': 
    app.run (debug=True, port=5001)