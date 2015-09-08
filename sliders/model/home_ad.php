<?php
class HomeAd extends AppModel {
	var $name = 'HomeAd';				  
	var $useTable="home_ads";

	function getAll($name)
	{
	    $ret = $this->query("SELECT * FROM home_ads WHERE name = '$name' ORDER BY rank ASC");
		return $ret;
        
	}
}
?>