<?php

namespace Drupal\read_pricing\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a price_list_family block.
 *
 * @Block(
 *   id = "price_list_family",
 *   admin_label = @Translation("price_list_family"),
 *   category = @Translation("Custom")
 * )
 */
class PriceListFamilyBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'price_list_family',
      '#attached' => ['library' => ['read_pricing/read_pricing_home_family']],
    ];
    return $build;
  }

}
