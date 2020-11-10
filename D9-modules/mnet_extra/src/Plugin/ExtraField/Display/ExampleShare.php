<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "share",
 *   label = @Translation("Share Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleShare extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);
  	
	$markup = '<i class="button-share" title="Share">11</i>';
    return ['#markup' => $markup];
  }

}
