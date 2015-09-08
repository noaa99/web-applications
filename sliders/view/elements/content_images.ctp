<?PHP
   $adSlides = $this->requestAction('home_ads/callSlidesData/'.$name);    
	
	$date = date('Y-m-d H:i');
	$start = date('Y-m-d');
    
    $this->Html->css(array('/css/asix/owl.carousel', '/css/asix/owl.homeads.theme'),'stylesheet', array('inline' => false));
    $this->Html->script('/js/asix/owl.carousel', array('inline' => false));
?>

<div id="<?PHP echo $id; ?>" class="owl-carousel">
<?PHP
    
	if ($option == 'thumbnail') {
        foreach ($adSlides as $ad) {
            if (($start >= $ad['home_ads']['start']) && ($date < $ad['home_ads']['end'] . ' ' . $ad['home_ads']['endtime']))
            { 
                echo "<div style='display:table; width:100%'>";
                echo $this->Html->image('../admin/img/upAd/'.$ad['home_ads']['image_name'], array(
                    'alt'=> $ad['home_ads']['alt'],
                    'title'=> $ad['home_ads']['alt'],
                    'class'=>'ad_img_thumbnail',
                    'url' => array('controller'=>'', 'action'=>$ad['home_ads']['link']),
                    ));
                    
                echo "<div class='home_ads_text_wrap_all'>";                    
                echo "<div class='home_ads_text_wrap'>";
                echo "<h2>".$ad['home_ads']['event_title']."</h2>";
                echo "<p>".$ad['home_ads']['event_description']."</p>";
                echo "<p>".$ad['home_ads']['event_start']."</p>";
                
                
                echo "<p>Location: ".$ad['home_ads']['event_location']."</p>";
                echo "<a href='".$ad['home_ads']['link']."'>Link</a>";
                echo "</div>";
                echo "</div>";
                echo "</div>";
             
            }
            else
            { 
            }
        }
    } else if ($option == 'thumbnailTwo') {
        foreach ($adSlides as $ad) {
            if (($start >= $ad['home_ads']['start']) && ($date < $ad['home_ads']['end'] . ' ' . $ad['home_ads']['endtime']))
            { 
                echo "<div style='display:table; width:100%'>";
                echo $this->Html->image('../admin/img/upAd/'.$ad['home_ads']['image_name'], array(
                    'alt'=> $ad['home_ads']['alt'],
                    'title'=> $ad['home_ads']['alt'],
                    'class'=>'ad_img_thumbnail_two',
                    'url' => array('controller'=>'', 'action'=>$ad['home_ads']['link']),
                    ));
              
                //echo "<p>Location: ".$ad['home_ads']['event_location']."</p>";
                //echo "<a href='".$ad['home_ads']['link']."'>Link</a>";
                
                echo "</div>";
             
            }
            else
            { 
            }
        }
    } else {
        foreach ($adSlides as $ad) {
        if (($start >= $ad['home_ads']['start']) && ($date < $ad['home_ads']['end'] . ' ' . $ad['home_ads']['endtime']))
        { 
        echo "<div>";
        echo $this->Html->image('../admin/img/upAd/'.$ad['home_ads']['image_name'], array(
            'alt'=> $ad['home_ads']['alt'], 
            'title'=> $ad['home_ads']['alt'],
            'class'=>'ad_img',
            //'url' => array('controller'=>'', 'action'=>$ad['home_ads']['link'])
            ));
        echo "</div>";
        }
        else
        { 
        }
    }
    }
?>
</div>
