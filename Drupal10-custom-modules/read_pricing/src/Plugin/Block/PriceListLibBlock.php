<?php

namespace Drupal\read_pricing\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a price_list_lib block.
 *
 * @Block(
 *   id = "price_list_lib",
 *   admin_label = @Translation("price_list_lib"),
 *   category = @Translation("Custom")
 * )
 */
class PriceListLibBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'price_list_lib',
      '#attached' => ['library' => ['read_pricing/read_pricing_lib']],
    ];
    return $build;
  }

}
