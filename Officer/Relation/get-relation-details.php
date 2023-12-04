<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve the relation ID from the URL parameter
    $relationId = $_GET['id'];

    // Use prepared statement to avoid SQL injection
    $select_query = "SELECT * FROM relation WHERE id = ?";
    $stmt = $conn->prepare($select_query);

    // Bind the parameter
    $stmt->bind_param("i", $relationId);

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    if ($result === false) {
        echo json_encode(['success' => false, 'message' => 'Error executing query: ' . $conn->error]);
        exit();
    }

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $basePath = '/PJ/Backend/Officer/uploads/';
        $imagePath = $basePath . basename($row['relation_pic']);
        
        $response = [
            'success' => true,
            'data' => [
                'id' => $row['id'],
                'relation_date' => $row['relation_date'],
                'relation_content' => $row['relation_content'],
                'relation_pic' => $imagePath
            ]
        ];
        
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Relation not found']);
    }

    // Close the statement
    $stmt->close();
} else {
    // Handle invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

// Close the connection
$conn->close();
?>