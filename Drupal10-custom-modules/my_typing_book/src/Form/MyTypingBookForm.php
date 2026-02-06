<?php

namespace Drupal\my_typing_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Class MyTypingBookForm.
 */
class MyTypingBookForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'my_typing_book_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Get boolean fields for 'blog_post'.
    $fields = my_typing_book_get_boolean_fields();

    $form['boolean_field'] = [
      '#type' => 'select',
      '#title' => $this->t('Select Boolean Field'),
      '#description' => $this->t('Choose the boolean field you want to update.'),
      '#options' => $fields,
      '#required' => TRUE,
    ];

    $form['node_titles'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Node Titles'),
      '#description' => $this->t('Enter node titles, one per line.'),
      '#rows' => 10,
      '#required' => TRUE,
    ];

    $form['set_value'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Set to Yes (checked) or No (unchecked)'),
      '#default_value' => 1,
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Update Nodes'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $boolean_field = $form_state->getValue('boolean_field');
    $titles = $form_state->getValue('node_titles');
    $titles_array = array_filter(array_map('trim', explode("\n", $titles)));
    $set_value = $form_state->getValue('set_value') ? 1 : 0;

    foreach ($titles_array as $title) {
      $nids = \Drupal::entityQuery('node')
        ->accessCheck(TRUE)
        ->condition('title', $title)
        ->condition('type', 'blog_post')
        ->execute();

      if (!empty($nids)) {
        foreach ($nids as $nid) {
          $node = Node::load($nid);
          if ($node && $node->get($boolean_field)->value != $set_value) {
            $node->set($boolean_field, $set_value);
            $node->save();
          }
        }
      }
    }

    $this->messenger()->addStatus($this->t('The field "@field" has been updated.', ['@field' => $boolean_field]));
  }
}
