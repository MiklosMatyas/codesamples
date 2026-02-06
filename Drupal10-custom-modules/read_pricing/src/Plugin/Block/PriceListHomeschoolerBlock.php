<?php

namespace Drupal\read_pricing\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a price_list_homeschooler block.
 *
 * @Block(
 *   id = "price_list_homeschooler",
 *   admin_label = @Translation("price_list_homeschooler"),
 *   category = @Translation("Custom")
 * )
 */
class PriceListHomeschoolerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'price_list_homeschooler',
      '#attached' => ['library' => ['read_pricing/read_pricing_home_homeschooler']],
    ];
    return $build;
  }

}
