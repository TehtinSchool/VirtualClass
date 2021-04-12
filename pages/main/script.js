let currentPath = "../../assets/documents/Алімпіядныя заданні";

function showFiles(files){
    $("#files-list").empty();
    files.forEach(file => {
        type = file.split(".");
        if(isTypeForDownload(type[type.length - 1])){
            $("#files-list").append( `
                <li class="materials-list__item">
                    <a class="materials-list__link" href="${currentPath}${file}" download>${file}</a>
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
getData();
function getData(){
    $.getJSON( "../../assets/data/roots.json", function( data ) {
        let array = new Array();
        
        let currentPathSplit = currentPath.split("/");
        let currentFolder = currentPathSplit[currentPathSplit.length - 1];

        data.forEach(element => {
            
            let splitElementPath = `${element.Path}/${element.Name}`.split("/");
            let folderPozition = splitElementPath.indexOf(currentFolder);
            
            if(folderPozition >= 0){
                let nextElement = splitElementPath[folderPozition + 1];
                
                if(!array.includes(nextElement)){
                    array.push(nextElement);
                }
            }
        });
        showFiles(array);
      });
}