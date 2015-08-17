<!-- Counter box Dark version element -->
<!-- Hyunjong Choi 4/13/2015 -->

<?PHP
    $file = file_get_contents('json/asix/'.$data, true);
    
    $jsondecode = json_decode($file, true);
    $fun = $jsondecode['fun_fact'];
    
    
    $this->Html->css(array('/css/asix/shortcode/counterbox.style'),'stylesheet', array('inline' => false));
    $this->Html->script('/js/asix/counter/jquery.counterup.min', array('inline' => false));
?>
<div class="dark_wrap_wrap <?PHP echo $color; ?>">
<div class="counterbox_dark_wrap">
	<div class="ffacts-heading">
			<h2 class="section-title light" tabindex="0"><?php echo $fun[0]['title'];?></h2>					
	</div>
	<br />
	<div class="counter_wrap">
		<div class="counter-box-dark">
			<div class="imcounters">
				<span class="count"><?php echo $fun[0]['val_1'];?></span>
				<h3><?php echo $fun[0]['tag_1'];?></h3>
			</div><!-- imcounters -->	
        </div>
        <div class="counter-box-dark">
			<div class="imcounters">
				<span class="count"><?php echo $fun[0]['val_2'];?></span>
				<h3><?php echo $fun[0]['tag_2'];?></h3>
			</div><!-- imcounters -->	
        </div>
        <div class="counter-box-dark">
			<div class="imcounters">
				<span class="count"><?php echo $fun[0]['val_3'];?></span>
				<h3><?php echo $fun[0]['tag_3'];?></h3>
			</div><!-- imcounters -->	
        </div>
        <div class="counter-box-dark">
			<div class="imcounters">
				<span class="count"><?php echo $fun[0]['val_4'];?></span>
				<h3><?php echo $fun[0]['tag_4'];?></h3>
			</div><!-- imcounters -->		
		</div><!-- counter-box -->
	</div>
</div>
</div>
<?PHP
    // Include javascript files
    $this->Html->script('/js/asix/counter/jquery.counterup.min', array('inline' => false)); 
    $this->Html->script('/js/asix/counter/waypoints.min', array('inline' => false));
?>


<script>
/*
jQuery(document).ready(function( $ ) {
$('span.count').counterUp({
delay: 100, // the delay time in ms
time: 3000 // the speed time in ms
});
});
*/
</script>