#include <WiFi.h>
#include <HTTPClient.h>
// #include <DHT.h>

// #define DHTPIN 4
// #define DHTTYPE DHT11

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_passowrd";
const char* serverName = "http://your_local_ip_address:3000/api/sensor-data";

float randomFloat(float min, float max) {
  return (float)random(min * 100, max * 100) / 100.0;
}

// DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
   // dht.begin();
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  randomSeed(analogRead(0));
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

      // float temperature = dht.readTemperature();
  //   float humidity = dht.readHumidity();

  //   if (isnan(temperature) || isnan(humidity)) {
  //     Serial.println("Failed to read from DHT sensor!");
  //     return;
  //   }

    float temperature = randomFloat(20.0, 30.0);
    float humidity = randomFloat(40.0, 60.0);

    Serial.printf("Sending - Temperature: %.2f°C, Humidity: %.2f%%\n", temperature, humidity);

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String httpRequestData = "{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}";

    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      Serial.printf("HTTP Response code: %d\n", httpResponseCode);
      String payload = http.getString();
      Serial.println("Response payload: " + payload);
    } else {
      Serial.printf("Error code: %d\n", httpResponseCode);
      Serial.printf("Error: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(30000);
}
