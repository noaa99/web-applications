<h2>Sample code</h2>
<p>single-video.ctp file should be put on /view/element folder.</p>
<code>
<?php echo $this->element('single-video', array('poster'=>'../../videos/asix/student-success-fee.jpg', 'source'=>'../videos/bouldering.mp4', 'caption'=>'../videos/bouldering.vtt')); ?>
</code>
# API Overview
The following denotes the HTTPS-based API for [BrowserStack](https://www.browserstack.com). It provides browser-as-a-service for automated cross-browser testing. The goal is to provide a simple service which can easily be used by any browser testing framework.

### Authentication
All methods need to authenticate who you are. Before spawning browser workers and deleting a worker for example. Authentication is done using your username and the BrowserStack access key within the HTTP request. For example:

    $ curl -u "username:access_key" https://api.browserstack.com/4

> A `401 Unauthorized` response is given if an unauthorized request is made.

### Schema
All requests are made to `https://api.browserstack.com/VERSION/` and all returned data is done so in JSON-format. The version this documentation outlines is 4.
