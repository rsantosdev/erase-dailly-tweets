'use strict';

const cron = require('cron'),
  moment = require('moment'),
  Twit = require('twit');

const T = new Twit({
  consumer_key: '7gEaXGayoy18TZdpQIfnLt5zO',
  consumer_secret: 'wvNsAImITK3ay4hZc3KVwiDJiIcNpjyXZ9OVz0DBhycAXSIFmi',
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
})

// Creates a new job to run dailly
new cron.CronJob('00 55 23 * * *', () => {
  T.get('statuses/user_timeline', { count: 10 }, function (err, data, response) {

    if (data && data.length) {
      for (let tweet of data) {
        let created = new Date(tweet.created_at);
        if (moment().isSame(created, 'day')) {
          console.log(`Deleting tweet: ${tweet.id}`);
          T.post('statuses/destroy/:id', { id: tweet.id_str }, function (err, data, response) {
            console.log(`Tweet deleted: ${tweet.id}`);
          });
        }
      }
    }

  });

}, null, true, null, null, true);