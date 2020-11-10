<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;
use Drupal\Core\Render\Markup;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "readmore",
 *   label = @Translation("Readmore Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleReadmore extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);

	$markup = '<div class="view-more">
                <a class="view-more" href="javascript:void(0)">Read more <span class="icon-angle-double-right"></span></a>
               </div>';
    return ['#markup' => Markup::create($markup)];
  }

}
