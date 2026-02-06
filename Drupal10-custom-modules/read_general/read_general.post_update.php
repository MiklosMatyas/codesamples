<?php

function read_general_post_update_field_blog_banner_text(&$sandbox) {
  $field_map['node'] = [
    'field_blog_banner_text' => 'text_long',
  ];
  return \Drupal\field_type_converter\FieldTypeConverter::processBatch($sandbox, $field_map);
}
