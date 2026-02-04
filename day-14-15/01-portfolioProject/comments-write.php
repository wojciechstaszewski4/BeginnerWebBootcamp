<?php
    $servername = "localhost";
    $username = "dm80501_admin";
    $password = "Danek1234!";
    $dbname = "dm80501_comments";

    header('Content-Type: application/json; charset=utf-8');

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "error" => "Nie udało się połączyć z bazą danych!"
        ]);
        exit;
    }

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (!$name || !$email || !$comment) {
        http_response_code(400);
        echo json_encode([
            "success" => false, 
            "error" => "Wszystkie pola są wymagane i muszą być poprawnie wypełnione!"
        ]);
        $conn->close();
        exit;
    }

    $receivedDate = date("Y-m-d H:i:s");

    $query = $conn->prepare(
        "INSERT INTO `comments` (`receivedDate`, `name`, `e-mail`, `comment`) VALUES (?, ?, ?, ?)"
    );
    $query->bind_param("ssss", $receivedDate, $name, $email, $comment);

    if ($query->execute()) {
        echo json_encode([
            "success" => true, 
            "message" => "Komentarz został zapisany pomyślnie!"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "error" => "Nie udało się zapisać komentarza!"
        ]);
    }

    $query->close();
    $conn->close();
?>
