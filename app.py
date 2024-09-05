import MySQLdb
from flask import Flask, render_template_string, request, redirect, flash, url_for, session, jsonify
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Configurações do MySQL
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
        cur.execute("SELECT * FROM usuario WHERE email = %s", [email])
        user = cur.fetchone()
        cur.close()


        if user and bcrypt.check_password_hash(user[3], password):
            session['user_id'] = user[0]
            return redirect(url_for('almox'))
        else:
            flash('Email ou senha incorretos', 'danger')
            return redirect(url_for('home'))

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

        flash('Conta criada com sucesso!', 'success')
        return redirect(url_for('home'))

    return render_template_string(open('signup.html').read())


@app.route('/almox')
def almox():
    if 'user_id' not in session:
        return redirect(url_for('home'))
    return render_template_string(open('almox.html').read())

@app.route('/get_products')
def get_products():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM produtos")
    produtos = cursor.fetchall()
    cursor.close()

    products_list = []
    for produto in produtos:
        products_list.append({
            'codigo': produto[0],
            'nome': produto[1],
            'categoria': produto[2],
            'valor': produto[3],
            'quantidade': produto[4],  
            'total': produto[3] * produto[4]  
        })
    return jsonify(products_list)




@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.get_json()
    nome = data['nome']
    categoria = data['categoria']
    valor = float(data['valor'])
    quantidade = int(data['quantidade']) 

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO produtos (nome, categoria, valor, quant) VALUES (%s, %s, %s, %s)", 
                   (nome, categoria, valor, quantidade))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Produto adicionado com sucesso!'})

@app.route('/update_product/<int:codigo>', methods=['POST'])
def update_product(codigo):
    data = request.get_json() 
    nome = data['nome']
    categoria = data['categoria']
    valor = float(data['valor'])
    quantidade = int(data['quantidade'])

    cursor = mysql.connection.cursor()
    cursor.execute("""
        UPDATE produtos 
        SET nome = %s, categoria = %s, valor = %s, quant = %s 
        WHERE codigo = %s
    """, (nome, categoria, valor, quantidade, codigo))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Produto atualizado com sucesso!'})




@app.route('/delete_product/<int:codigo>', methods=['DELETE'])
def delete_product(codigo):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM produtos WHERE codigo = %s", (codigo,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Produto excluído com sucesso!'})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
