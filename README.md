# click to congress (node)

This is a node port of the [click to congress elixir api](https://github.com/noslouch/clicktocongress-api).

## development

* `$ git clone https://github.com/nypublicradio/click-to-congress` this repository
* `$ cd click-to-congress
* `$ npm install`
* `$ cp .env.sample .env`.

Add your twilio credentials to your freshly copied `.env` file.

To open up your local server to the incoming Twilio webhook (which actually connects the call), you can use a tool like [ngrok](https://www.npmjs.com/package/ngrok) to open up a local webserver to the world.

Once you've opened up a local address, update your `.env` accordingly:
```sh
SCHEME_FOR_TWILIO=http
HOST_FOR_TWILIO=<your ngrok host>
```

Then just `$ node index.js` and you're on your way.

## testing

You'll need mocha install globally with `$ npm install -g mocha`.

Run the tests with `npm test`.
