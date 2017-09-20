[![Build Status](https://travis-ci.org/matteolc/t2-airtime-demo.svg?branch=master)](https://travis-ci.org/matteolc/t2-airtime-demo)
[![GitHub version](https://badge.fury.io/gh/matteolc%2Ft2-airtime-demo.svg)](https://badge.fury.io/gh/matteolc%2Ft2-airtime-demo)
[![Code Climate](https://codeclimate.com/github/matteolc/t2-airtime-demo.png)](https://codeclimate.com/github/matteolc/t2-airtime-demo)

T2-Airtime-Demo
===============

Frontend demo application for the [T2-Airtime](https://github.com/matteolc/t2_airtime) gem.

## Installation

1. Clone this repository
2. Install packages:

```sh
yarn install
```

3. Export the API endpoint:

```sh
export REACT_APP_API_ADDRESS=<your_proxy_address>
export REACT_APP_API_PORT=<your_proxy_port>
export REACT_APP_API_PROTOCOL=<http or https>
export REACT_APP_SIMULATION_ONLY=<yes or no>
export REACT_APP_API_TOKEN=<t2_airtime_api_token>
export REACT_APP_API_KEY=<t2_airtime_api_key>
```

4. Build:

```sh
npm run build
```

5. Serve:

```sh
yarn global add serve
serve -s build
```  