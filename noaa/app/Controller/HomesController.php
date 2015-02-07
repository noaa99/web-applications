<?php
/**
 * @copyright     Copyright (c) Noaa Software by Hyunjong Choi.
 * @link          http://pagora.noaa.besaba.com cakeProject
 */
class HomesController extends AppController {
	
	function index () {
		$this->layout = 'home';
		$this->set('title_for_layout','Cakephp Project Main');
	}
	
	function main () {
		$this->layout = 'main';
		$this->set('title_for_layout','Cakephp Project Main');
	}
}
?>