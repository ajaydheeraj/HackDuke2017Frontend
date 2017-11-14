from flask import Flask, request
import requests
from requests.auth import HTTPBasicAuth

app = Flask(__name__)
app.debug = True

#data set
class data(object):
    def __init__(self):
        self.access_token = ""
        self.vid = ""
        self.counter = 0
        self.aqiThresh = 75
        self.tempThresh = 50
        self.trip = demoVar()
        
    def __eq__(self, other):
        return (self.aqiThresh == other.aqiThresh and self.tempThresh == \
                other.aqiThresh)

#empty url case
@app.route("/")
def hello():
    return "Hello World!"
    
#gets the humidity at a location given coordinates
@app.route("/humidity")
def getHumidity():
    global demo
    trip = demo.trip
    index = count % len(trip)
    latitude = trip[index][0]
    longitude = trip[index][1]
    
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + \
            str(latitude) + "&lon=" + str(longitude) + \
            "&APPID=d726ca63bc861b5774cc680ca100c416"
    hum = requests.get(url).json()["main"]["humidity"]
        
    return hum

#demo stuff
def demoVar():
    #coordinates of demo trip
    trip = [ (29.781, -95.499),
            (29.781, -95.873),
            (29.781, -96.158),
            (29.705, -96.356),
            (29.686, -96.861), #Fayette
            (29.705, -97.345),
            (29.648, -97.630),
            (29.590, -97.740),
            (29.996, -98.205),
            (29.822, -98.763), #Kendall
            (30.069, -99.038),
            (30.164, -99.258),
            (30.259, -99.567),
            (30.401, -99.686),
            (30.468, -100.181), #Sutton
            (30.704, -101.148),
            (30.883, -102.345),
            (30.997, -103.664),
            (31.072, -104.158),
            (31.081, -104.422), #Culberson
            (31.081, -105.091),
            (31.567, -106.182),
            (32.197, -106.696),
            (32.272, -107.508),
            (32.197, -108.418), #Grant
            (32.272, -108.893),
            (32.281, -109.318),
            (31.979, -110.535),
            (32.506, -111.287),
            (33.421, -112.554), #Maricopa
            (33.669, -114.176),
            (33.638, -115.126),
            (34.145, -117.393),
            (34.227, -118.326),
            (35.073, -119.084), #Kern
            (36.059, -120.014), 
            (36.518, -120.509),
            (36.451, -120.825),
            (37.230, -121.114),
            (37.656, -121.424), #San Joaquin
            (37.725, -121.666),
            (37.827, -122.285)
            ]
            
    return trip

#gets the aqi using the coordinates
def getAqi(coordinates):
    latitude = coordinates[0]    
    longitude = coordinates[1]
        
    url = "https://api.breezometer.com/baqi/?lat=" + str(latitude) + "&lon=" + \
            str(longitude) + "&key=86cb8cc452264312b8929878ceb5a855"
    aqi = requests.get(url).json()["country_aqi"]
    
    return (latitude, longitude, aqi)
    
#api.openweathermap.org/data/2.5/weather?lat=???&lon=???
def getTemp(coordinates):
    latitude = coordinates[0]    
    longitude = coordinates[1]
        
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + \
            str(latitude) + "&lon=" + str(longitude) + \
            "&APPID=d726ca63bc861b5774cc680ca100c416"
    temp = requests.get(url).json()["main"]["temp"]
    
    return temp

#runs the function
@app.route("/AQI")
def locationList():
    # global demo

    trip = [ (29.781, -95.499),
            (29.781, -95.873),
            (29.781, -96.158),
            (29.705, -96.356),
            (29.686, -96.861), #Fayette
            (29.705, -97.345),
            (29.648, -97.630),
            (29.590, -97.740),
            (29.996, -98.205),
            (29.822, -98.763), #Kendall
            (30.069, -99.038),
            (30.164, -99.258),
            (30.259, -99.567),
            (30.401, -99.686),
            (30.468, -100.181), #Sutton
            (30.704, -101.148),
            (30.883, -102.345),
            (30.997, -103.664),
            (31.072, -104.158),
            (31.081, -104.422), #Culberson
            (31.081, -105.091),
            (31.567, -106.182),
            (32.197, -106.696),
            (32.272, -107.508),
            (32.197, -108.418), #Grant
            (32.272, -108.893),
            (32.281, -109.318),
            (31.979, -110.535),
            (32.506, -111.287),
            (33.421, -112.554), #Maricopa
            (33.669, -114.176),
            (33.638, -115.126),
            (34.145, -117.393),
            (34.227, -118.326),
            (35.073, -119.084), #Kern
            (36.059, -120.014), 
            (36.518, -120.509),
            (36.451, -120.825),
            (37.230, -121.114),
            (37.656, -121.424), #San Joaquin
            (37.725, -121.666),
            (37.827, -122.285)
            ]
    
    AC = {True: "START", False: "STOP"}
    sunroof = {True: "OPEN", False: "CLOSE"}
    
    isAC = True
    isSR = False
    
    aqis = []
    
    for i in range(len(trip)):
        coordinates = trip[i]
        stats = getAqi(coordinates)
        aqis.append(stats[2])
        
        # temp = (getTemp(coordinates) - 273.15) * 1.8 + 32
        # if temp >= demo.tempThresh:
        #     isAC = stats[2] <= demo.aqiThresh
        #     isSR = stats[2] > demo.aqiThresh
        
        if i % 2 == 0:
            b = "LOW_BEAM"
        else: b = "HIGH_BEAM"
        
        r = requests.post("https://api.smartcar.com/v1.0/vehicles/359abe33-8a0a-403c-a596-aa664d69e91d" + \
            "/lights/headlights", headers= {"Authorization": "Bearer " + \
            "ca5d6c45-8974-49ca-b216-a1a1230c11b8"}, json = {"action":"FLASH", "type":b})
    
        # requests.post("https://api.smartcar.com/v1.0/vehicles/" + demo.vid + \
        #     "/climate", headers = {"Authorization": "Bearer "+ \
        #     demo.access_token}, json = {"action": AC[isAC], "temperature": 55})
        # 
        # requests.post("https://api.smartcar.com/v1.0/vehicles/" + demo.vid + \
        #     "/sunroof", headers = {"Authorization": "Bearer "+ \
        #     demo.access_token}, json = {"action": sunroof[isSR]})
        
    # demo.counter += 1
    
    print(r)
    
    return str(aqis)
    
#gets vehicle ID, information from url
#https://tesla.smartcar.com/oauth/authorize?response_type=code&client_id=0ed97d72-213d-45f1-a4ce-670515b86dc9&redirect_uri=http://localhost:5000/smartcar
@app.route("/smartcar")
def smartcar():
    global demo
    demo = data()
    
    code = request.args.get("code")

    r = requests.post("https://auth.smartcar.com/oauth/token", auth = \
        HTTPBasicAuth("0ed97d72-213d-45f1-a4ce-670515b86dc9", \
        "c611c61a-ca39-4a37-9a6c-918305442166"), data = {"grant_type": \
        "authorization_code", "code": code, "redirect_uri": \
        "http://localhost:5000/smartcar"})
    
    demo.access_token = r.json()["access_token"]
    vehicles = requests.get("https://api.smartcar.com/v1.0/vehicles", \
        headers = {"Authorization": "Bearer " + demo.access_token});    
    demo.vid = vehicles.json()["vehicles"][0]
    info = requests.get("https://api.smartcar.com/v1.0/vehicles/" + demo.vid, \
        headers = {"Authorization": "Bearer " + demo.access_token});
        
    s = requests.post("https://api.smartcar.com/v1.0/vehicles/" + demo.vid + \
        "/lights/headlights", headers= {"Authorization": "Bearer " + \
        demo.access_token}, json = {"action":"FLASH", "type":"HIGH_BEAM"})
        
    print(demo.access_token)

    return info.text
    
#gets the user's temperature threshold preferences from the frontend
@app.route("/tempThreshold")
def getTempThresh():
    global demo
    demo.tempThresh = request.args

#gets the user's aqi threshold preferences from the frontend
@app.route("/aqiThreshold")
def getAqiThresh():
    global demo
    demo.aqiThresh = request.args

if __name__ == "__main__":
    app.run()