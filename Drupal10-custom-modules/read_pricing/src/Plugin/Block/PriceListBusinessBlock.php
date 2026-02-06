<?php

namespace Drupal\read_pricing\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a price_list_business block.
 *
 * @Block(
 *   id = "price_list_business",
 *   admin_label = @Translation("price_list_business"),
 *   category = @Translation("Custom")
 * )
 */
class PriceListBusinessBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'price_list_business',
      '#attached' => ['library' => ['read_pricing/read_pricing_business']],
    ];
    return $build;
  }

}
