function add_info() {
    const dateTimestamp=new Date().getTime();
    var IPdiv =document.getElementById("Ipdiv");
    var ipAdress=document.getElementById("ipAdress").value;
    if(ipAdress=="") {
        alert("IP를 입력해주세요!");
        return;
    }
    // 원본 찾아서 pre_set으로 저장.
    var pre_set = document.getElementById('pre_set');

    // 다음에 필드ID가 중복되지 않도록 1 증가.
    pre_set.setAttribute('last-id', dateTimestamp);
    // last-id 속성에서 필드ID르 쓸값 찾고 //처음은 0을 가져옴
    var fieldid = pre_set.getAttribute('last-id');



    // 복사할 div 엘리먼트 생성
    var div = document.createElement('div');
    // 내용 복사
    div.innerHTML = pre_set.innerHTML;

    // 복사된 엘리먼트의 id를 'field-data-XX'가 되도록 지정.
    div.id =dateTimestamp;
    div.setAttribute("ip_n",ipAdress);
    // selection_content 영역에 내용 변경.
    // var temp = div.getElementsByClassName('selection_content')[0];
    //  temp.innerText = "IP :" +ipAdress;
    var a = div.getElementsByClassName("selection_content2")[0]
    // var aObj = document.createElement("a");
    // aObj.innerText = `IP : ${ipAdress}`;
    // aObj.href = '#'; // 여기 부분에 실제 url을 넣으면 됩니다.
    // div.appendChild(aObj)

    a.innerText = `IP : ${ipAdress}`;
    a.setAttribute('ip_number',ipAdress);



     //a.setAttribute('href','charts.html?ip='+ipAdress);

    //  a.onclick = function(){
    //  sessionStorage.setItem("cur_single_IP",a.getAttribute('ip_number'));
      //document.location.reload(true);
          //a.setAttribute('href','charts.html');
     //     console.log(sessionStorage.getItem("cur_single_IP"));
    // };

    // temp.innerText = x;
    // delete_box에 삭제할 fieldid 정보 건네기
    var deleteBox = div.getElementsByClassName('delete_box')[0];
    // target이라는 속성에 삭제할 div id 저장
    deleteBox.setAttribute('target',div.id);
    // #field에 복사한 div 추가.
    document.getElementById('field').appendChild(div);


    localStorage.setItem(dateTimestamp, div.outerHTML);
   // console.log(div.innerHTML);
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
    //  document.getElementById('field').removeChild(field);
    document.getElementById('field').removeChild(field);
    localStorage.removeItem(key);

}

// ********************local*********************************
function init(){
    //console.log("출력됨");
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


            //var a=$("#abcd:first-child").attr("id");
        //console.log($('#abcd div:first-child').attr('id')) ;


          //  var a= document.getElementById("abcd").innerHTML;
            //console.log(localDiv.outerHTML);

               // oChild = oInput.childNodes[0];




          //  console.log(a);
            console.log(localDiv.outerHTML);
            document.getElementById('field').appendChild(localDiv.firstChild);
           // console.log(localDiv.outerHTML);

            var ip_n=document.getElementById(sortedArray[j]);
          var a=ip_n.getAttribute("ip_n");
            console.log(a);
               //console.log(localDiv.firstChild.getRootNode());
            //var child.innerHTML =localDiv.firstChild;


            //var a=$("#adcd:first-child").attr("id");
           // console.log(a);

            }

        }
    }
    //return sortedArray;


