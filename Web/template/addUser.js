function add_info() {
    const dateTimestamp=new Date().getTime();
    var IPdiv =document.getElementById("Ipdiv");
    var ipAdress=document.getElementById("ipAdress").value;
    if(ipAdress=="") {
        alert("IP를 입력해주세요!");
        return;
    }
    document.getElementById("ipAdress").value="";
    // 원본 찾아서 pre_set으로 저장.
    var pre_set = document.getElementById('pre_set');

    // 다음에 필드ID가 중복되지 않도록 1 증가.
    pre_set.setAttribute('last-id', dateTimestamp);
    // last-id 속성에서 필드ID르 쓸값 찾고 //처음은 0을 가져옴
    var fieldid = pre_set.getAttribute('last-id');

    // check if exist
    var child = document.getElementById('field').children;
    var flag = false;
    for(var c = 0; c<child.length; c++){
        if( ipAdress == child[c].getAttribute("ip_n"))
            flag = true;
    }
    if(flag == true){
        alert("이미 존재하는 IP 입니다.")
        return;
    }
    // 복사할 div 엘리먼트 생성
    var div = document.createElement('div');
    // 내용 복사
    div.innerHTML = pre_set.innerHTML;

    // 복사된 엘리먼트의 id를 'field-data-XX'가 되도록 지정.
    div.id =dateTimestamp;
    div.setAttribute("ip_n",ipAdress);

    // selection_content 영역에 내용 변경.

    var a = div.getElementsByClassName("selection_content2")[0]


    a.innerText = `IP : ${ipAdress}`;
    a.setAttribute('ip_number',ipAdress);

    // delete_box에 삭제할 fieldid 정보 건네기
    var deleteBox = div.getElementsByClassName('delete_box')[0];
    // target이라는 속성에 삭제할 div id 저장
    deleteBox.setAttribute('target',div.id);
    // #field에 복사한 div 추가.
    document.getElementById('field').appendChild(div);


    localStorage.setItem(dateTimestamp, div.outerHTML);
   // console.log(div.innerHTML);

    //if multi, make new chart
    if(document.getElementById("title").innerText == "Multi Monitoring"){
        var iframe1 = document.createElement('iframe');
        var div_ip =document.c
        iframe1.style.width="1400px"
        iframe1.style.height="300px"
        iframe1.style.marginRight="20px"
        iframe1.style.paddingBottom="20px"
        iframe1.setAttribute('scrolling',"no");
        iframe1.setAttribute('frameborder',0);
        iframe1.setAttribute('id',ipAdress);
        iframe1.setAttribute('name', ipAdress);
        iframe1.setAttribute('class',"panel");
        //ip
        //var ip_n=document.getElementById(sortedArray[j]);
        //console.log(ip_n.outerHTML)
        //var a=ip_n.getAttribute("ip_n");
        var a = ipAdress;
        console.log(a);

        //a.setAttribute('href','charts.html?ip='+ipAdress);
        iframe1.setAttribute('src', 'iframeChart.html?ip='+a);

        document.getElementById('posthere').appendChild(iframe1);
    }
}

function delete_info(obj) {
    // 삭제할 ID 정보 찾기
    var target = obj.parentNode.getAttribute('target');
    console.log(obj.parentNode);
    // 삭제할 element 찾기
    // console.log(target);
    var field = document.getElementById(target);
    // #field 에서 삭제할 element 제거하기
    console.log(field);
    var key = field.getAttribute("id");
    var IP_to_remove = field.outerText;
    console.log(IP_to_remove);
    IP_to_remove = IP_to_remove.substring(5, IP_to_remove.length - 7);
    //  document.getElementById('field').removeChild(field);
    document.getElementById('field').removeChild(field);
    localStorage.removeItem(key);

    if(document.getElementById("title").innerText == "Multi Monitoring"){
        var to_remove = document.getElementById(IP_to_remove);
        document.getElementById('posthere').removeChild(to_remove);
    }

}

// ********************local*********************************
function init(){

    addListLocal();
}

function addListLocal() {
    if(localStorage.length > 0){
        var localStorageArray = new Array();
        for (i=0;i<localStorage.length;i++){
            localStorageArray[i] = localStorage.key(i);
        }
        var sortedArray = localStorageArray.sort();

        for (var j=0; j<localStorage.length;j++ ){
            var localDiv = document.createElement('div');
            //console.log(localDiv.outerHTML);
            localDiv.setAttribute('id','abcd');
            localDiv.innerHTML=localStorage.getItem(sortedArray[j]);

            console.log(localDiv.outerHTML);
            console.log(localDiv.firstChild);

                document.getElementById('field').appendChild(localDiv.firstChild);
                var ip_n=document.getElementById(sortedArray[j]);
                var a=ip_n.getAttribute("ip_n");
               // console.log(a);


            }

        }
    }
    //return sortedArray;

function enterkey(){
    if(window.event.keyCode==13){
        console.log('enterkey');
        add_info();

    }
}
