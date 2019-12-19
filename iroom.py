#!/usr/bin/python
# -*- coding: utf-8 -*- 

from flask import Flask, url_for, session, render_template, Response, request, flash, redirect, abort, jsonify
from flaskext.mysql import MySQL
import json
import time


mysql = MySQL()

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('IROOM_SETTINGS', silent=True)
mysql.init_app(app)

type_sensor = {"Temperatura": 0, "Humedad": 0, "Luz": 0, "Sonido": 0, "Movimiento": 0}
sensores = ["temperatura", "humedad", "luz", "sonido", "movimiento"]

def event_sensor():
	while True:		   
		conn = mysql.connect()
		cursor = conn.cursor()
		i=0
		for sensor in type_sensor:			
			cursor.execute ("SELECT valor FROM sensors where nombre='" + sensor + "' ORDER BY time DESC LIMIT 1")
			ret_value = int(cursor.fetchone()[0])
			if ret_value != type_sensor[sensor]:
				j_data = {"tipo": sensores[i], "valor": ret_value}
				data_json = json.dumps(j_data)
				print (j_data)
				yield 'data: %s\n\n' % str(data_json)
				type_sensor[sensor] = ret_value
				#flash("Actualizado sensor de " + sensor)
			i=i+1
				
		conn.close()
			   
@app.route('/update_sensor')
def sse_request():	  
	return Response(event_sensor(), mimetype='text/event-stream')
	  
@app.route('/')
def main(): 
	return render_template('index.html')
		
@app.route('/sensors')
def sensors():
	return render_template('sensors.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != app.config['USERNAME']:
			error = 'Invalid username'
		elif request.form['password'] != app.config['PASSWORD']:
			error = 'Invalid password'
		else:
			session['logged_in'] = True
			flash('Has entrado en la sesion')
			return redirect(url_for('sensors'))
	return render_template('login.html', error = error)

@app.route('/logout')
def logout():
	session.pop('logged_in', None)
	flash('Has salido de la sesion')
	return redirect(url_for('main'))


@app.route('/iluminacion')
def iluminacion():
	return render_template('iluminacion.html')

	
@app.route('/setcolor', methods=['GET'])
def setcolor():
	conn = mysql.connect()
	cursor = conn.cursor()
	RGB = ["red", "green", "blue"]
	indice = 1
	for color in RGB:
		cursor.execute("INSERT INTO sensors(nombre, valor) VALUES(%s, %s)", (color, int("0x" +request.args.get("color")[indice:indice + 2],16)))
		indice += 2
	conn.commit()
	conn.close()
	return {'color': request.args.get("color")}


if __name__=='__main__':
	with app.test_request_context():
		app.debug = True
		app.run(host ='0.0.0.0')
		
