$('#search').on('click',async e=>{
    $('#bankcode').empty();

    let bank = JSON.stringify( await $.ajax({
        url:`https://bankcode-api.appspot.com/api/bank/JP?name=${encodeURIComponent( $('#bankName').val() )}`,
        dataType:'jsonp'
    }) );
    let pbank = JSON.parse(bank);
    console.log(pbank.data);
    const select = $("<select>",{
        id:'selectbank'
    });
    for(let i=0;i<pbank.data.length;i++){
        var data = pbank.data[i];
        var bankcode = data.code;
        var bankname = data.name;
        var nameFullKana = data.nameFullKana;
        console.log(bankcode);
        console.log(bankname);
        var option = $("<option>",{
            value:bankcode,
            text:bankname+'('+nameFullKana+')'
        });
        select.append(option);
    }
    $('#bankcode').append(select);
    $('#hurigana').val(pbank.data[0].nameFullKana);
});

$('#branchsearch').on('click',async e=>{
    $('#branchcode').empty();

    let branch = JSON.stringify( await $.ajax({
        url:`https://bankcode-api.appspot.com/api/bank/JP/${encodeURIComponent( $('#selectbank').val() )}?name=${encodeURIComponent( $('#branchName').val() )}`,
        dataType:'jsonp'
    }) );
    let pbranch = JSON.parse(branch);
    console.log(pbranch.data);
    const select = $("<select id='selectbranch'>");
    for(let i=0;i<pbranch.data.length;i++){
        var data = pbranch.data[i];
        var branchcode = data.code;
        var branchname = data.name;
        console.log(branchcode);
        console.log(branchname);

        var option = $("<option>",{
            value:branchcode,
            text:branchname
        });
        select.append(option);

    }
    $('#branchcode').append(select);

});
