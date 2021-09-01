// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('#country-selector').select2();
    $("#country-selector").select2({
        placeholder: "Select a country",
        allowClear: true
    });
});