<?PHP
    if ($id)
        $files = $this->requestAction('form_policies/downloadRank/'.$id);
    else if ($sub) {
        $files = $this->requestAction('form_policies/downloadRankSub/'.$sub);
    }
    $this->Html->css(array('/css/asix/shortcode/counterbox.style'),'stylesheet', array('inline' => false));
    $this->Html->script('/js/asix/counter/jquery.counterup.min', array('inline' => false));
?>
<div class="light_wrap_wrap <?PHP echo $color; ?>">
<div class="counterbox_light_wrap">
	<div class="ffacts-heading">
	    <h2 class="section-title light" tabindex="0"><?PHP if ($title) echo $title; else echo "Popular Downloads"; ?></h2>
	</div>
	<br />
	
	<div class="counter_wrap">
	
<?PHP
		$count = 1;
		foreach ($files as $file) {
			if ($count <=4 ) {
			    echo "<div class='counter-box-light'>";
			    echo "<div class='imcounters'>";
                echo "<span class='count'>".$file["FormRank"]["count"]."</span>";
                echo "</div>";
				
				echo "<div class='link_wrap'><span class='pdf_icon'></span><p>";
				echo "<a href='/form_policies/show/".$file["FormPolicy"]["id"]."'>";
				echo $file["FormPolicy"]["name"];
				echo "</a>";
				echo "</p></div></div>";
			} else {
				//return;
			}
			$count++;
		}
?>
	</div>
</div>
</div>

    
