#!/usr/bin/python
# -*- coding: utf-8 -*- 

import time
import smbus
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)
bus = smbus.SMBus(1) 

class temperature(Resource):
	def get(self):
		try:
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1	
		try:
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
			return {'temperature': value}
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
			
		

class humidity(Resource):
	def get(self):
		try:
			bus.write_byte(0x04, 1)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
			return {'humidity': value}
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
			
class light(Resource):
	def get(self):
		try:
			bus.write_byte(0x04, 2)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:	
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
			return {'light': value}
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1

class sound(Resource):
	def get(self):
		try:
			bus.write_byte(0x04, 3)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:	
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
			return {'sound': value}
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
			
		
class motion(Resource):
	def get(self):
		try:
			bus.write_byte(0x04, 4)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:
			bus.write_byte(0x04, 0)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
			return {'motion': value}
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
			
class red(Resource):	
	def put(self, id):
		try:
			bus.write_byte(0x04, 5)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:	
			bus.write_byte(0x04, id)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		return {'red': id}
		
class green(Resource):	
	def put(self, id):
		value = id 
		try:
			bus.write_byte(0x04, 6)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:
			bus.write_byte(0x04, id)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		return {'green': id}
				  
class blue(Resource):	
	def put(self, id):
		value = id 
		try:
			bus.write_byte(0x04, 7)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1	
		try:
			bus.write_byte(0x04, id)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1	
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		return {'blue': id}

class led(Resource):	
	def put(self, id):
		value = request.form['data'] 
		try:
			bus.write_byte(0x04, id+4)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		try:
			bus.write_byte(0x04, int(value))
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1
		time.sleep(.300)
		try:
			value = bus.read_byte(0x04)
		except IOError:
			subprocess.call(['i2cdetect', '-y', '1'])
			flag = 1	
		if id == 1: 
			color = 'red'
		if id == 2: 
			color = 'green'
		if id == 3: 
			color = 'blue'
		return {'color': color, 'value': value }

api.add_resource(temperature, '/temperature') 
api.add_resource(humidity, '/humidity') 
api.add_resource(light, '/light')
api.add_resource(sound, '/sound')
api.add_resource(motion, '/motion')
api.add_resource(red, '/red/<int:id>')
api.add_resource(green, '/green/<int:id>')
api.add_resource(blue, '/blue/<int:id>')
api.add_resource(led, '/led/<int:id>')



if __name__ == "__main__":
	app.run(host='0.0.0.0', port=8000, debug=True)
