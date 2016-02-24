#-*- coding: utf-8 -*-


import urllib
import urllib2
import json
import md5

token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzcsIm5hbWUiOiJtYm9zcyIsImRlc2NyaXB0aW9uIjoiIiwiaWF0IjoxNDU2Mjk4NzkxLCJleHAiOjE0NTYzMDA1OTF9.UkHKUbaLXVsIJOxldIItmL7WL83f3z9ILFoPwd599bE"
def getMD5(str):
	m1 = md5.new()   
	m1.update(str)   
	return m1.hexdigest()

def get(url):
	global token
	try:
		req = urllib2.Request(url)
		req.add_header("User-Agent","Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6")
		req.add_header("Authorization", token)
		response = urllib2.urlopen(req)
		return json.JSONDecoder().decode(response.read())
	except urllib2.URLError, e:
		print e

def post(url, paras, isJson = True):
	req = urllib2.Request(url, urllib.urlencode(paras))
	if isJson:
		req = urllib2.Request(url, json.JSONEncoder().encode(paras))
		req.add_header("Content-type","application/json")

	response = urllib2.urlopen(req)
	return json.JSONDecoder().decode(response.read())

def login():
	global token
	url = "http://127.0.0.1:3000/user/login?b=3"
	params = {'name':'mboss', "password": getMD5("04140906")}	
	data = post(url, params, False)
	if(data["status"]):
		token = data["data"]
		print data["data"]
		print data["marks"]
#usage
#url = "http://127.0.0.1:3000/user/login?b=3"
#params = {'name':'mboss', "password": getMD5("04140906")}	
#
#data = post(url, params, False)
#print data["status"]
#print data["data"]
#print data["marks"]


#login()

print get("http://127.0.0.1:3000/user")






