<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "status",
 *   label = @Translation("Status Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleDeal extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);

  	$expired = $entity->get("field_expired")->getValue();
  	$startsends = $entity->get("field_starts_ends")->getValue();
    if(isset($startsends[0]['value'])){
    	$timestamp = strtotime($startsends[0]['value']);
    	$in_time = \Drupal::service('date.formatter')->formatInterval($timestamp - REQUEST_TIME);

    	if($expired[0]['value'] == "0"){
    		$status = "Active";
    	}
    	if($expired[0]['value'] == "1"){
    		$status = '<span class="expired">Expired</span>';
    	}
     	if($in_time != "0 sec"){
    		$status = '<span class="upcoming">in ' . $in_time . '</span>';
    	}

      return ['#markup' => 'Status: ' . $status];
    }
  }

}
