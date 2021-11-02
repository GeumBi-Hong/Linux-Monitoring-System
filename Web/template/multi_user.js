


window.onload = function() {
  init()
    console.log("ok")
    multi_chart()

};


function multi_chart() {


    if (localStorage.length > 0) {
        var localStorageArray = new Array();
        for (i = 0; i < localStorage.length; i++) {
            localStorageArray[i] = localStorage.key(i);
        }
        var sortedArray = localStorageArray.sort();

        for (var j = 0; j < localStorage.length; j++) {


            var iframe1 = document.createElement('iframe');
            var div_ip =document.c
            iframe1.style.width="800px"
            iframe1.style.height="300px"
            iframe1.style.marginRight="20px"
            iframe1.style.paddingBottom="20px"
            iframe1.setAttribute('scrolling',"no");
            iframe1.setAttribute('frameborder',0);
            iframe1.setAttribute('name', sortedArray[j]);
            iframe1.setAttribute('class',"panel");
            //ip
            var ip_n=document.getElementById(sortedArray[j]);
            var a=ip_n.getAttribute("ip_n");
            console.log(a);



            //a.setAttribute('href','charts.html?ip='+ipAdress);
            iframe1.setAttribute('src', 'iframeChart.html?ip='+a);

            document.getElementById('posthere').appendChild(iframe1);


        }

    }




}









