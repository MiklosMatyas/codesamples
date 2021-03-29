<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;
use Drupal\Core\Render\Markup;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "views",
 *   label = @Translation("Views Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleViews extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);
   	  
    $markup = '<label class="views">3.7k Views</label>';
    return ['#markup' => Markup::create($markup)];
  }

}
