<?php
    $this->Html->script(array('/js/asix/video'), array('inline' => false));
    $this->Html->css(array('/css/asix/video-js'), 'stylesheet', array('inline' => false));
?>
<!--div id="video-header text-center">
    <h3 class="font-Anton text-uppercase text-center">2015 Rose Float - Soaring Stories</h3>
</div-->

<div class="container">
	<div class="large-video">
		<video id="mediaspace" class="video-js vjs-default-skin"
		  controls="controls" preload="none"
		  poster="<?php echo $poster; ?>"
		  data-setup='{}' tabindex="-1">
		 	<source src="<?php echo $source; ?>" type='video/mp4' />
		 	<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
			<track kind="captions" src="<?php echo $caption; ?>" srclang="en" label="English">
		</video>
	</div>
</div>
