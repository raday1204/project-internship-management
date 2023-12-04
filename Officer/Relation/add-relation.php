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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form data
    $relation_date = $_POST['relation_date'];
    $relation_content = $_POST['relation_content'];

    $upload_path = '';

    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $file_name = $_FILES['file']['name'];
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_type = $_FILES['file']['type'];
        $file_size = $_FILES['file']['size'];

        // Validate file type and size (adjust as needed)
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
        $max_size = 5 * 1024 * 1024; // 5 MB

        if (in_array($file_type, $allowed_types) && $file_size <= $max_size) {
            // Move the uploaded file to the desired directory
            $upload_path = '/xampp/htdocs/PJ/Backend/Officer/uploads/' . $file_name;
            if (move_uploaded_file($file_tmp, $upload_path)) {
                // Use prepared statements to prevent SQL injection
                $insert_query = "INSERT INTO relation (relation_date, relation_content, relation_pic) 
                                VALUES (?, ?, ?)";
                $stmt = $conn->prepare($insert_query);
                $stmt->bind_param("sss", $relation_date, $relation_content, $upload_path);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
                    exit;
                } else {
                    echo json_encode(['success' => false, 'message' => 'Error inserting data: ' . $stmt->error]);
                    exit;
                }
            } else {
                die(json_encode(['success' => false, 'message' => 'Error moving uploaded file']));
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid file type or size']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error uploading file']);
    }
    exit();
} else {
    // Handle invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    // Exit the script after sending the JSON response
    exit();
}

$conn->close();
?>
