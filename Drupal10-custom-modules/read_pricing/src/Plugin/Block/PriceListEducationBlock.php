<?php

namespace Drupal\read_pricing\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a price_list_education block.
 *
 * @Block(
 *   id = "price_list_education",
 *   admin_label = @Translation("price_list_education"),
 *   category = @Translation("Custom")
 * )
 */
class PriceListEducationBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'price_list_education',
      '#attached' => ['library' => ['read_pricing/read_pricing_education']],
    ];
    return $build;
  }

}
