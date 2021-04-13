let currentPath = "../../assets/documents";
getData();

function showFiles(files){
    $("#files-list").empty();
    files.forEach(file => {
        let fileNameSplit = file.split(".");
        let extensionFile = fileNameSplit[fileNameSplit.length - 1];
        let nameIconExtension = getNameIconExtension(extensionFile);

        if(nameIconExtension !== "icon-folder"){
            $("#files-list").append( `
                <li class="materials-list__item icon ${nameIconExtension}">
                    <a class="materials-list__link" href="${currentPath}/${file}" download>${file}</a>
                </li>
            `);
        }else{
            $("#files-list").append( `
            <li class="materials-list__item icon ${nameIconExtension}">
                <p class="materials-list__link link-folder">${file}</p>
            </li>
        `);
        }
    });
}
function getNameIconExtension(extension){
    switch(extension) {
        case 'pptx':
        case 'ppt':
            return "icon-ppt";
        case 'wav':
        case 'mp3':
            return "icon-music";
        case 'zip':
        case 'rar':
            return "icon-rar";
        case 'pdf':
            return "icon-pdf";
        case 'rtf':
        case 'doc':
        case 'docx':
            return "icon-word";
        default:
            return "icon-folder";
    }
}
$(".go-back-js").click( function() {
    let splitUrl = currentPath.split("/");
    if(splitUrl.pop() === ""){
        splitUrl.pop();
    }
    currentPath = splitUrl.join("/");
    getData();
});
$('body').on('click', '.link-folder', function() {
    const folderName = $(this).text();
    currentPath = `${currentPath}/${folderName}`;
    getData();
});
function getData(){
    $.getJSON( "../../assets/data/roots.json", function( data ) {
        let array = new Array();

        let currentPathSplit = currentPath.split("/");
        let currentFolder = currentPathSplit[currentPathSplit.length - 1];

        let targetPathSplit = currentPath.split("assets/");
        let targetPath = targetPathSplit[targetPathSplit.length - 1];

        data.forEach(element => {
            if(element.Path.includes(targetPath)){
                let splitElementPath = `${element.Path}/${element.Name}`.split("/");
                let folderPozition = splitElementPath.indexOf(currentFolder);

                if(folderPozition >= 0){
                    let nextElement = splitElementPath[folderPozition + 1];

                    if(!array.includes(nextElement)){
                        array.push(nextElement);
                    }
                }
            }
        });
        showFiles(array);
    });

    if(currentPath === "../../assets/documents"){
      $(".go-back-js").hide();
    }
    else{
      $(".go-back-js").show();
    }
}