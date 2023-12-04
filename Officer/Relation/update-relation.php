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
    $relationId = $_GET['id'];

    $updateFields = array();
    
    if (isset($_POST['relation_date'])) {
        $updateFields[] = "relation_date = '" . $_POST['relation_date'] . "'";
    }
    
    if (isset($_POST['relation_content'])) {
        $updateFields[] = "relation_content = '" . $_POST['relation_content'] . "'";
    }
    
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $file_name = $_FILES['file']['name'];
        $file_tmp = $_FILES['file']['tmp_name'];

        $upload_path = '/xampp/htdocs/PJ/Backend/Officer/uploads/' . $file_name;
        if (move_uploaded_file($file_tmp, $upload_path)) {
            $updateFields[] = "relation_pic = '$upload_path'";
        } else {
            echo json_encode(['success' => false, 'message' => 'Error moving uploaded file']);
            exit();
        }
    }

    if (!empty($updateFields)) {
        $update_query = "UPDATE relation 
                         SET " . implode(", ", $updateFields) . "
                         WHERE id = $relationId";

        if ($conn->query($update_query) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Data updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating data: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No fields to update']);
    }

    exit();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

$conn->close();
?>
