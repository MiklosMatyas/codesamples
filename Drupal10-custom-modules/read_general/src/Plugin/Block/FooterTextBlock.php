<?php

namespace Drupal\read_general\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a footer text block.
 *
 * @Block(
 *   id = "read_general_footer_text",
 *   admin_label = @Translation("Footer Text"),
 *   category = @Translation("Custom")
 * )
 */
class FooterTextBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    
    /*
    $build['content'] = [
      '#markup' => $this->t('It works!'),
    ];
    return $build;
*/
    return [
      '#theme' => 'footer_text',
      '#test_var' => $this->t('Test Value'),
    ];

  }

}
