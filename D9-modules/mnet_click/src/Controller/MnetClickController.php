<?php


namespace Drupal\mnet_click\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Drupal\Core\Cache\Cache;

/**
 * Provides route responses for the mnet_click module.
 */
class MnetClickController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function goto() {

    if(\Drupal::request()->query->get('bid')){
      $bid = \Drupal::request()->query->get('bid');
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($bid);
    }
    if(\Drupal::request()->query->get('nid')){
      $nid = \Drupal::request()->query->get('nid');
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
    }

    if($node != NULL && ($node->type->entity->label() == "Banner" || $node->type->entity->label() == "Store" || $node->type->entity->label() == "Product" || $node->type->entity->label() == "Deal")) {
      $weight = $node->field_weight->value;
      $count = $node->field_click_count->value;
      if($node->type->entity->label() == "Banner"){
        $uri = $node->get('field_banner_url')->uri;
      }
      if($node->type->entity->label() == "Store"){
        $uri = $node->get('field_website')->uri;
      }
      if($node->type->entity->label() == "Product"){
        $uri = $node->get('field_product_url')->uri;
      }
      if($node->type->entity->label() == "Deal"){
        $uri = $node->get('field_deal_url')->uri;
      }
      $node->set('field_weight', $weight - 100);
      $node->set('field_click_count', $count + 1);
      $node->setPublished(TRUE);
      $saved = $node->save();
      Cache::invalidateTags($node->getCacheTags());
      if($uri == NULL){
        return new TrustedRedirectResponse("/error404");
      }
      if($saved != NULL && $saved > 0 && $uri != NULL ){
        return new TrustedRedirectResponse($uri);
        die();
      }
    }
    else {
      return new TrustedRedirectResponse("/error404");
    }
  }

}
