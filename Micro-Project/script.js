// Constants for API configuration
const BASE_URL = "http://api.login2explore.com:5577";
const PUT_ENDPOINT = "/api/iml";
const GET_ENDPOINT = "/api/irl";
const TOKEN = "90934612|-31949212137910688|90956319";
const DB_NAME = "SCHOOL-DB";
const REL_NAME = "STUDENT-TABLE";

function validateAndGetFormData() {
    // Get all form values
    const rollNo = $("#rollNo").val().trim();
    const fullName = $("#fullName").val().trim();
    const className = $("#className").val().trim();
    const birthDate = $("#birthDate").val();
    const address = $("#address").val().trim();
    const enrollmentDate = $("#enrollmentDate").val();

    // Validate required fields
    if (!rollNo) {
        alert("Roll Number is required!");
        $("#rollNo").focus();
        return null;
    }
    if (!fullName) {
        alert("Full Name is required!");
        $("#fullName").focus();
        return null;
    }
    if (!className) {
        alert("Class is required!");
        $("#className").focus();
        return null;
    }
    if (!birthDate) {
        alert("Birth Date is required!");
        $("#birthDate").focus();
        return null;
    }
    if (!address) {
        alert("Address is required!");
        $("#address").focus();
        return null;
    }
    if (!enrollmentDate) {
        alert("Enrollment Date is required!");
        $("#enrollmentDate").focus();
        return null;
    }

    // Create JSON object matching the database structure
    return {
        rollNo: rollNo,
        fullName: fullName,
        className: className,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };
}

function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
+ "\"token\" : \""
+ connToken
+ "\","
+ "\"dbName\": \""
+ dbName
+ "\",\n" + "\"cmd\" : \"PUT\",\n"
+ "\"rel\" : \""
+ relName + "\","
+ "\"jsonStr\": \n"
+ JSON.stringify(jsonObj)
+ "\n"
+ "}";
return putRequest;
}

function executeCommand(reqJson, endPoint) {
    var url = BASE_URL + endPoint;
    var jsonObj;
    $.ajax({
        url: url,
        type: "POST",
        data: reqJson,
        contentType: "application/json",
        async: false,
        success: function(result) {
            jsonObj = JSON.parse(result);
        },
        error: function(result) {
            var dataJsonObj = result.responseText;
            jsonObj = JSON.parse(dataJsonObj);
        }
    });
    return jsonObj;
}

function saveStudent() {
    var formData = validateAndGetFormData();
    if (!formData) return;
    var putReqStr = createPUTRequest(TOKEN, formData, DB_NAME, REL_NAME);
    alert(putReqStr);
    var resultObj = executeCommand(putReqStr, PUT_ENDPOINT);
    alert(JSON.stringify(resultObj));
    resetForm();
}

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#className").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
}

// Add event listeners
$(document).ready(function() {
    $("#stuSave").click(function() {
        saveStudent();
    });
    $(".btn-reset").click(function() {
        resetForm();
    });
});
