<?php
/*
 * create_user.php connecting to Intercom vith API.
*/
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  $email = $input['email'] ?? '';

  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $accessToken = getenv('INTERCOM_ACCESS_TOKEN');
    if (!$accessToken) {
      echo json_encode([
        'success' => false,
        'message' => 'Missing Intercom access token.',
      ]);
      exit;
    }


    $userResponse = createUser($email, $accessToken);
    if ($userResponse['success']) {
        //echo json_encode($userResponse['success']);
        //echo json_encode($userResponse['id']);
        
        #Downloaded Colouring Book 9581161
      $tagResponse = addTag($userResponse['id'], '9581161', $accessToken);
      if ($tagResponse['success']) {
        echo json_encode(['success' => true]);
      } else {
        echo json_encode(['success' => false, 'message' => $tagResponse['message']]);
      }
    } else {
      echo json_encode(['success' => false, 'message' => $userResponse['message']]);
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
  }
} else {
  echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

function createUser($email, $accessToken) {
  $url = 'https://api.intercom.io/contacts';
  $data = [
    'email' => $email,
  ];

  $response = sendRequest($url, $data, $accessToken);
  if ($response && isset($response['id'])) {
    return ['success' => true, 'id' => $response['id']];
  } else {
    return ['success' => false, 'message' => $response['message'] ?? 'Failed to create user.'];
  }
}

function addTag($contactId, $tag, $accessToken) {
    $url = 'https://api.intercom.io/contacts/' . $contactId . '/tags';
    $data = [
      'id' => $tag,
    ];

  $response = sendRequest($url, $data, $accessToken);
  if ($response && isset($response['id'])) {
    return ['success' => true];
  } else {
    return ['success' => false, 'message' => $response['message'] ?? 'Failed to add tag.'];
  }
}

function sendRequest($url, $data, $accessToken) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $accessToken,
    'Content-Type: application/json',
    'Accept: application/json'
  ]);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($httpCode >= 200 && $httpCode < 300) {
    return json_decode($response, true);
  } else {
    return ['message' => 'HTTP error code: ' . $httpCode];
  }
}
?>
