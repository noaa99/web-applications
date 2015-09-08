<?php
class HomeAdsController extends AppController
{
	var $name = 'HomeAds';

	function callSlidesData($name) {
		$this->layout='ajax';
	
		$data = $this->HomeAd->getAll($name);
		return $data; 
	}
}
?>
