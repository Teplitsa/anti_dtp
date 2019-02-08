function showInfoMenu() {
    $('#searchForm').collapse('hide');
    $('#addForm').collapse('hide');
    $('#infoMenu').collapse('show');
    $('#optionForm').collapse('hide');
    $('#loginform').collapse('hide');
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('hide');
    $('#moresearchForm').collapse('hide');
}

function showAddForm() {
    $('#infoMenu').collapse('hide');
    $('#searchForm').collapse('hide');
    $('#addForm').collapse('show');
    $('#optionForm').collapse('hide');
    $('#loginform').collapse('hide');
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('hide');
    $('#moresearchForm').collapse('hide');
}

function showSearchForm() {
    $('#infoMenu').collapse('hide');
    $('#addForm').collapse('hide');
    $('#searchForm').collapse('show');
    $('#optionForm').collapse('hide');
    $('#loginform').collapse('hide');
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('hide');
    $('#moresearchForm').collapse('hide');
}

function showOptionForm() {
    $('#infoMenu').collapse('hide');
    $('#addForm').collapse('hide');
    $('#searchForm').collapse('hide');
    $('#optionForm').collapse('show');
    $('#loginform').collapse('hide');
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('hide');
    $('#moresearchForm').collapse('hide');
}

function showLoginForm() {
    $('#infoMenu').collapse('hide');
    $('#addForm').collapse('hide');
    $('#searchForm').collapse('hide');
    $('#optionForm').collapse('hide');
    $('#loginform2').collapse('show');
    $('#moresearchForm').collapse('hide');
    $('#loginerror').html('');
}

function hideInfoMenu() {
    $('#infoMenu').collapse('hide');
}

function hideSearchForm() {
    $('#searchForm').collapse('hide');
}

function hideMoreSearchForm() {
    $('#moresearchForm').collapse('hide');
}

function hideOptionForm() {
    $('#optionForm').collapse('hide');
}

function hideLoginForm() {
    $('#loginform').collapse('hide');
}

function hideLoginForm2() {
    $('#loginform2').collapse('hide');
}

function hideLoginForm3() {
    $('#loginform3').collapse('hide');
}

function switchformtologin() {
    $('#loginerror').html('');
    $('#loginform2').collapse('show');
    $('#loginform').collapse('hide');
}

function switchformtoreg() {
    $('#loginform').collapse('show');
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('hide');
    $('#loginerror').html('');
    $('#regerror').html('');
}

function switchformtofoget() {
    $('#loginform2').collapse('hide');
    $('#loginform3').collapse('show');
}

function switchformtologin() {
    $('#loginform3').collapse('hide');
    $('#loginform').collapse('hide');
    $('#loginform2').collapse('show');
    $('#loginerror').html('');
}

function switchtomoresearch() {
    $('#searchForm').collapse('hide');
    $('#moresearchForm').collapse('show');
}

function switchtosearch() {
    $('#searchForm').collapse('show');
    $('#moresearchForm').collapse('hide');
}

function hideAddForm() {
    $('#addForm').collapse('hide');
}
