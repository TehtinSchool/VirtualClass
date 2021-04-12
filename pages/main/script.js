let url = "/../../assets/documents/";
showMaterialsList();
function showMaterialsList(){
    $.ajax({
        url: url,
        success: function(data){
            let fileNames = new Array();
            $(data).find("li > a").each(function(){
                currentName = $(this).attr("title");
                    if(currentName !== ".."){
                        fileNames.push(currentName);
                    }
            });
            if(url === "/../../assets/documents/"){
                $("#go-back").hide();
            }
            else{
                $("#go-back").show();
            }

            showFiles(fileNames);
        }
    });
}
function showFiles(files){
    $("#files-list").empty();
    files.forEach(file => {
        type = file.split(".");
        if(isTypeForDownload(type[type.length - 1])){
            $("#files-list").append( `
                <li class="materials-list__item">
                    <a class="materials-list__link" href="${url}${file}" download>${file}</a>
                </li>
            `);
        }else{
            $("#files-list").append( `
            <li class="materials-list__item">
                <p class="materials-list__link link-folder" >${file}</p>
            </li>
        `);
        }
    });
}
function isTypeForDownload(type){
    switch(type) {
        case 'jpg':
        case 'png':
        case 'gif':
        case 'zip':
        case 'rar':
        case 'pdf':
        case 'php':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
            return true;
        default:
            return false;
    }
}
$("#go-back").click( function() {
    let splitUrl = url.split("/");
    if(splitUrl.pop() === ""){
        splitUrl.pop();
    }
    url = splitUrl.join("/") + "/";
    showMaterialsList();
});
$('body').on('click', '.link-folder', function() {
    const folderName = $(this).text();
    url = `${url}${folderName}/`;
    showMaterialsList();
});
