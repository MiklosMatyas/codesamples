<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;
use Drupal\Core\Render\Markup;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "clicks",
 *   label = @Translation("Clicks Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleClicks extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);
   	  
    $markup = '<label class="clicks">101 Clicks</label>';
    return ['#markup' => Markup::create($markup)];
  }

}
