document.getElementById("editdp").addEventListener('click', function(){
    document.querySelector("#uploadfile input").click();
});

document.querySelector("#uploadfile input").addEventListener('change', function(){
    document.querySelector("#uploadfile").submit();
})