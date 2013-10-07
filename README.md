# haraka-redis

This is a Haraka plugin that will save an incoming email to a locally running redis server. This plugin depends on Redis to store the email.

## Installation

### Haraka Install

If you've already installed Haraka, you can skip this step.

Install Nodejs.

```bash
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

Then setup haraka.

```bash
sudo npm install -g Haraka
sudo haraka -i /etc/haraka
```

Comment out all the plugins in /etc/haraka/config/plugins.

```bash
sudo vim /etc/haraka/config/plugins
```

Change `config/me` to list your domain.

```bash
sudo vim /etc/haraka/config/me
```

Add your domain to that file.

```
yourdomain.com
```

Start the haraka service

```bash
sudo haraka -c /etc/haraka
```

[Click here](http://beingasysadmin.wordpress.com/2013/04/16/haraka-a-nodejs-based-smtp-server/) for more detailed haraka install instructions.

### haraka-redis Install

Add `data.redis` to the end of /etc/haraka/config/plugins.

```bash
sudo vim /etc/haraka/config/plugins
```

And add the following.

```
data.redis
```

Finally, setup the js plugin.

```bash
cd /etc/haraka/plugins
sudo npm install -g redis
sudo npm install -g microtime
sudo npm install -g redis-wstream
sudo wget https://raw.github.com/scottmotte/haraka-redis/master/data.redis.js
cd ..
sudo haraka -c .
```


