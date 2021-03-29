<?php

namespace Drupal\mnet_extra\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field\Plugin\ExtraFieldDisplayBase;
use Drupal\Core\Render\Markup;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "comments",
 *   label = @Translation("Comments Extra field for Deal"),
 *   bundles = {
 *     "node.deal",
 *   }
 * )
 */
class ExampleComments extends ExtraFieldDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity) {
  	//ksm($entity);

/*
    $count = $entity->get("comment")->getValue();
    //ksm($count[0]["comment_count"]);
    if(isset($count[0]["comment_count"])){
      if($count[0]["comment_count"] > 1){
        $plural = "s";
      }
      else $plural = "";
      $markup = "";
      if($count[0]["comment_count"] > 0){
        $markup = '<label class="comments"><a href="#commentbox">' . $count[0]["comment_count"] . ' Comment' . $plural . '</a></label>';
      }
      return ['#markup' => Markup::create($markup)];
    }
*/

  }

}
