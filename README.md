### IoT Driven Platform for Drug Supply Chain Transparency

IoT Driven Platform for Drug Supply Chain Transparency leverages blockchain technology to store supply chain data securely. IoT sensors areutilized to monitor and record temperature and humidity data throughout the supply chain, ensuring real-time tracking and transparency. This integrated approach ensures the integrity and quality of pharmaceutical products, providing a reliable and transparent process from production to delivery.

#### Installing locally

First clone the repository, install dependencies and setup the .env file

```
git clone git@github.com:aswinr19/iot-driven-platform-for-drug-suplychain-transparency.git

cd iot-driven-platform-for-drug-suplychain-transparency

npm install

cp .env.example .env
```

Next run local blokchain and deploy contract

```
npx hardhat node

npx hardhat run --network localhost script/deploy.js
```

Copy the address of both conracts and replace it in context/Constants.ts and move the abi's of both contracts into the context directory

```
mv artifacts/contracts/Core/Mainchain.sol/Mainchain.json context/

mv artifacts/contracts/utils/Partnership.sol/Partnership.json context/
```

[Setup local blockchain on metamask](https://docs.metamask.io/wallet/how-to/run-devnet), [import](https://support.metamask.io/managing-my-wallet/accounts-and-addresses/how-to-import-an-account/#importing-using-a-private-key) any one of the twenty accounts provided by hardhat and also [clear activity data](https://support.metamask.io/managing-my-wallet/resetting-deleting-and-restoring/how-to-clear-your-account-activity-reset-account) (it can cause nonce miss match error)

Run the project

```
npm run dev
```

To fetch temperature and sensor data using iot

-   [setup ESP32](https://randomnerdtutorials.com/installing-esp32-arduino-ide-2-0) and [install necessary libraries for DHT11](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide)
-   connect the DHT11 sensor to the correct pins of the ESP32
-   copy the code for fetching sensor data and paste it in arduino ide
-   find the ip address of the pc by using ipconfig (windows) or ifconfig (linux/mac)
-   replace the wifi ssid password and ip address in the code with your values (the pc and the ESP should connect to the same wifi for communication to happen)
-   flash the code to the ESP32
-   open serial monitor and see the log

This project is based on an [older project](https://github.com/khalidfsh/drug-supply-chain) i found on github. To find more details about the project visit the github repo
