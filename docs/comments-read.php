<?php
    $servername = "localhost";
    $username = "dm72959_admin";
    $password = "Danek1234!";
    $dbname = "dm72959_comments";

    header('Content-Type: application/json; charset=utf-8');

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Nie udało się połączyć z bazą danych!"]);
        exit;
    }

    $query = "SELECT `name`, `e-mail`, `comment`, `receivedDate` FROM `comments`";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Błąd podczas pobierania danych: " . $conn->error]);
        $conn->close();
        exit;
    }

    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = [
            'author' => htmlspecialchars($row['name']),
            'email' => htmlspecialchars($row['e-mail']),
            'content' => htmlspecialchars($row['comment']),
            'date' => $row['receivedDate']
        ];
    }

    $result->free();
    $conn->close();

    echo json_encode($comments, JSON_UNESCAPED_UNICODE);
?>
