#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import time
import json
import urllib3
import mysql.connector



# create table sensors( time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, nombre VARCHAR(15), valor INTEGER);
type_sensor = ['Temperatura', 'Humedad', 'Luz', 'Sonido', 'Movimiento']
RGB_values = ['red', 'green', 'blue']
last_value = [0,0,0,0,0,0,0,0]

# ACTULIZAR LA VARIABLE server CON LA DIRECCIÓN IP DE LA MÁQUINA EN LA QUE ESTÑE CORRIENDO EL EMULADOR DE IROOM
server = 'http://0.0.0.0:8000/'

http = urllib3.PoolManager()

def updateSensor(code):
	db = mysql.connector.connect(host = "localhost", user = "ricardo", passwd = "rcasanova9", db = "BaseDeDatos")
	cursor = db.cursor()
	try:
		""" PARTE 1:COMPLETAR AQUÍ EL CÓDIGO PARA LEER EL VALOR DE UN SENSOR CON API REST"""
		response = http.request('GET', server + code)
		data = json.loads(response.data)
		value = data[code]
	except ValueError:
		print ('Error de leer dato del sensor')
	if value != last_value[code]:
		try:
			type_sensor[code] = value
			""" PARTE 1: COMPLETAR AQUÍ EL CÓDIGO PARA ESCRIBIR EN LA BASE DE DATOS EL VALOR DEL SENSOR"""
			cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", (code, value))
			db.commit()
		except ValueError:
			print ('Error al insertar en base de datos')
	db.close()

def controlLightColor():
	db = mysql.connector.connect(host = "localhost", user = "ricardo", passwd = "rcasanova9", db = "BaseDeDatos")
	cursor = db.cursor()
	for color in RGB_values:
		try:
			cursor.execute ("SELECT valor FROM sensors WHERE nombre='"+color+"' ORDER BY time DESC LIMIT 1")
			cursor_value = int(cursor.fetchone()[0])
			if cursor_value != RGB_values[color]:
				RGB_values[color] = cursor_value
				print (color.capitalize()+": " + str(cursor_value))
				response = http.request('PUT', server + color + '/' + str(cursor_value))
		except ValueError:
			print ('Error al consultar de base de datos o conectar con iroom')
	db.close()


if __name__ == "__main__":
	db = mysql.connector.connect(host = "localhost", user = "ricardo", passwd = "rcasanova9", db = "BaseDeDatos")
	cursor=db.cursor()
	cursor.execute ("DROP table sensors")
	cursor.execute ("create table sensors( time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, nombre VARCHAR(15), valor INTEGER)")
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('Temperatura', 20))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('Humedad', 40))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('Luz', 30))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('Sonido', 10))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('Movimiento', 0))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('red', 20))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('blue', 20))
	cursor.execute ("INSERT INTO sensors(nombre, valor) values(%s, %s)", ('green', 20))
	db.commit()
	db.close()

	while True:
		for sensor in type_sensor:
			updateSensor(sensor)
			controlLightColor()
			time.sleep(5)
