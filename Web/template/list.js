






//addEmptyValues(values, samples);
//addEmptyValues(values2,samples);
//addEmptyValues(values3,samples);

//var originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation
var v;  //cpu
var v2; //mem
var v3; //mem2
//var v4;
// Called after form input is processed

//startConnect();


/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/

function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    // host = document.getElementById("host").value;
    console.log("connect");
    // host=getParameterByName('ip_address');
    host="54.180.90.198";
//host="192.168.0.29"


    // port = document.getElementById("port").value;
    port="9001";
    // Print output for the user in the messages div
//    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    //   document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
    });
//addEmptyValues(values,samples);
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    // topic = document.getElementById("topic").value;
    topic="mon/list/1";
    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe(topic);

}
// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    switch(message.destinationName){

        case "mon/list/1":
            var obj=[];
            String.prototype.replaceAll = function(org, dest) {
                return this.split(org).join(dest);
            }
            var str=message.payloadString;
           // var str="{'NO':'1','NAME':'APPLE','KOR':'사과','PRICE':'1000'},{'NO':'2','NAME':'BANANA','KOR':'바나나','PRICE':'500'},{'NO':'3','NAME':'MELON','KOR':'메론','PRICE':'2000'}";
            //var obj=[];
            str = str.replaceAll("},", "}|");
            var array = str.split("|");
            for (var i=0; i<array.length; i++)
            {
                //console.log(i)
                // console.log("sd"+array[i])
                // obj[i]= eval(array[i]);
                //sd=array[i];
                // obj.add(eval(sd));
                obj[i] = eval("("+array[i]+")");


            }

            var div_table =document.getElementById("list11");
            //테이블 다큐먼트 만들기
            var table11=document.createElement("table");
            // 완성된 table을 table11에 넣기
           table11=buildHtmlTable(obj);
            var count=0;
           while (div_table.hasChildNodes()){

                div_table.removeChild(div_table.firstChild);
               count++;
            }
            console.log("count="+count);

            document.getElementById("list11").appendChild(table11);

            //document.getElementById("abc").appendChild(table11);
            break;
    }
    obj.length=0;
     console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}
//list



// Builds the HTML Table out of myList json data from Ivy restful service.

    //var myList=[{ "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1", "path" : "(systemd)", "maj_flt" : "0", "cpu_usage" : "0.098355", "rss" : "2034" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "2", "path" : "(kthreadd)", "maj_flt" : "0", "cpu_usage" : "0.000360", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "3", "path" : "(rcu_gp)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "4", "path" : "(rcu_par_gp)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "8", "path" : "(mm_percpu_wq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "9", "path" : "(ksoftirqd/0)", "maj_flt" : "0", "cpu_usage" : "0.012047", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10", "path" : "(rcu_sched)", "maj_flt" : "0", "cpu_usage" : "0.027151", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "11", "path" : "(migration/0)", "maj_flt" : "0", "cpu_usage" : "0.000899", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "12", "path" : "(cpuhp/0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "13", "path" : "(cpuhp/1)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "14", "path" : "(migration/1)", "maj_flt" : "0", "cpu_usage" : "0.000180", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "15", "path" : "(ksoftirqd/1)", "maj_flt" : "0", "cpu_usage" : "0.006473", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "18", "path" : "(cpuhp/2)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "19", "path" : "(migration/2)", "maj_flt" : "0", "cpu_usage" : "0.000719", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "20", "path" : "(ksoftirqd/2)", "maj_flt" : "0", "cpu_usage" : "0.003057", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "21", "path" : "(kworker/2:0-mm_percpu_wq)", "maj_flt" : "0", "cpu_usage" : "0.132339", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "23", "path" : "(cpuhp/3)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "24", "path" : "(migration/3)", "maj_flt" : "0", "cpu_usage" : "0.000899", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "25", "path" : "(ksoftirqd/3)", "maj_flt" : "0", "cpu_usage" : "0.002517", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "28", "path" : "(kdevtmpfs)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "29", "path" : "(netns)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "32", "path" : "(khungtaskd)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "33", "path" : "(oom_reaper)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "34", "path" : "(writeback)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "35", "path" : "(kcompactd0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "52", "path" : "(kblockd)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "53", "path" : "(blkcg_punt_bio)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "54", "path" : "(watchdogd)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "57", "path" : "(rpciod)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "58", "path" : "(kworker/u9:0-hci0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "59", "path" : "(xprtiod)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "60", "path" : "(kswapd0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "61", "path" : "(nfsiod)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "62", "path" : "(iscsi_eh)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "63", "path" : "(dwc_otg)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "64", "path" : "(DWC", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "66", "path" : "(vchiq-slot/0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "67", "path" : "(vchiq-recy/0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "68", "path" : "(vchiq-sync/0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "69", "path" : "(vchiq-keep/0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "70", "path" : "(SMIO)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "72", "path" : "(mmc_complete)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "73", "path" : "(kworker/1:1H-kblockd)", "maj_flt" : "0", "cpu_usage" : "0.003597", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "74", "path" : "(kworker/0:1H-mmc_complete)", "maj_flt" : "0", "cpu_usage" : "0.017088", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "75", "path" : "(kworker/2:1H-kblockd)", "maj_flt" : "0", "cpu_usage" : "0.003777", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "76", "path" : "(jbd2/mmcblk0p2-)", "maj_flt" : "0", "cpu_usage" : "0.002878", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "77", "path" : "(ext4-rsv-conver)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "80", "path" : "(ipv6_addrconf)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "85", "path" : "(kworker/3:1H-kblockd)", "maj_flt" : "0", "cpu_usage" : "0.004498", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "114", "path" : "(systemd-journal)", "maj_flt" : "0", "cpu_usage" : "0.529474", "rss" : "1653" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "145", "path" : "(systemd-udevd)", "maj_flt" : "0", "cpu_usage" : "0.019977", "rss" : "954" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "175", "path" : "(SMIO)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "187", "path" : "(mmal-vchiq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "188", "path" : "(mmal-vchiq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "189", "path" : "(mmal-vchiq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "190", "path" : "(mmal-vchiq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "216", "path" : "(cfg80211)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "221", "path" : "(brcmf_wq/mmc1:0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "223", "path" : "(brcmf_wdog/mmc1)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "224", "path" : "(kworker/3:2-events_power_efficient)", "maj_flt" : "0", "cpu_usage" : "0.000180", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "276", "path" : "(systemd-timesyn)", "maj_flt" : "0", "cpu_usage" : "0.007926", "rss" : "707" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "313", "path" : "(alsactl)", "maj_flt" : "0", "cpu_usage" : "0.000540", "rss" : "191" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "314", "path" : "(rsyslogd)", "maj_flt" : "0", "cpu_usage" : "0.142331", "rss" : "688" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "317", "path" : "(cron)", "maj_flt" : "0", "cpu_usage" : "0.000540", "rss" : "574" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "319", "path" : "(mongod)", "maj_flt" : "0", "cpu_usage" : "0.875063", "rss" : "9578" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "326", "path" : "(thd)", "maj_flt" : "0", "cpu_usage" : "0.001081", "rss" : "550" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "331", "path" : "(dbus-daemon)", "maj_flt" : "0", "cpu_usage" : "0.008288", "rss" : "877" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "337", "path" : "(wpa_supplicant)", "maj_flt" : "0", "cpu_usage" : "0.001802", "rss" : "967" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "341", "path" : "(systemd-logind)", "maj_flt" : "0", "cpu_usage" : "0.003964", "rss" : "1446" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "344", "path" : "(avahi-daemon)", "maj_flt" : "0", "cpu_usage" : "0.012792", "rss" : "658" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "348", "path" : "(udisksd)", "maj_flt" : "0", "cpu_usage" : "0.006126", "rss" : "2275" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "362", "path" : "(rngd)", "maj_flt" : "0", "cpu_usage" : "0.023241", "rss" : "20" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "385", "path" : "(avahi-daemon)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "63" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "391", "path" : "(dhcpcd)", "maj_flt" : "0", "cpu_usage" : "0.000721", "rss" : "475" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "430", "path" : "(polkitd)", "maj_flt" : "0", "cpu_usage" : "0.001262", "rss" : "1455" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "436", "path" : "(lightdm)", "maj_flt" : "0", "cpu_usage" : "0.001262", "rss" : "1468" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "450", "path" : "(wpa_supplicant)", "maj_flt" : "0", "cpu_usage" : "0.004326", "rss" : "492" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "466", "path" : "(xrdp-sesman)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "90" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "483", "path" : "(login)", "maj_flt" : "0", "cpu_usage" : "0.001262", "rss" : "616" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "484", "path" : "(xrdp)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "428" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "485", "path" : "(wpa_supplicant)", "maj_flt" : "0", "cpu_usage" : "0.022893", "rss" : "965" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "486", "path" : "(Xorg)", "maj_flt" : "0", "cpu_usage" : "0.017846", "rss" : "9440" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "504", "path" : "(sshd)", "maj_flt" : "0", "cpu_usage" : "0.000541", "rss" : "1367" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "512", "path" : "(netatalk)", "maj_flt" : "0", "cpu_usage" : "0.005949", "rss" : "605" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "515", "path" : "(afpd)", "maj_flt" : "0", "cpu_usage" : "0.115368", "rss" : "2577" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "516", "path" : "(cnid_metad)", "maj_flt" : "0", "cpu_usage" : "0.000361", "rss" : "999" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "520", "path" : "(apache2)", "maj_flt" : "0", "cpu_usage" : "0.008654", "rss" : "1074" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "587", "path" : "(cryptd)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "609", "path" : "(hciattach)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "32" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "610", "path" : "(kworker/u9:2-hci0)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "614", "path" : "(bluetoothd)", "maj_flt" : "0", "cpu_usage" : "0.000902", "rss" : "1114" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "616", "path" : "(bluealsa)", "maj_flt" : "0", "cpu_usage" : "0.000361", "rss" : "1042" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "630", "path" : "(krfcommd)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "643", "path" : "(systemd)", "maj_flt" : "0", "cpu_usage" : "0.004689", "rss" : "1834" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "647", "path" : "((sd-pam))", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "429" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "668", "path" : "(bash)", "maj_flt" : "0", "cpu_usage" : "0.003969", "rss" : "893" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "684", "path" : "(lightdm)", "maj_flt" : "0", "cpu_usage" : "0.001263", "rss" : "1525" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "692", "path" : "(lxsession)", "maj_flt" : "0", "cpu_usage" : "0.003427", "rss" : "2973" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "701", "path" : "(dbus-daemon)", "maj_flt" : "0", "cpu_usage" : "0.001984", "rss" : "874" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "725", "path" : "(ssh-agent)", "maj_flt" : "0", "cpu_usage" : "0.000541", "rss" : "72" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "735", "path" : "(gvfsd)", "maj_flt" : "0", "cpu_usage" : "0.001083", "rss" : "1560" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "740", "path" : "(gvfsd-fuse)", "maj_flt" : "0", "cpu_usage" : "0.000722", "rss" : "1250" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "745", "path" : "(openbox)", "maj_flt" : "0", "cpu_usage" : "0.005594", "rss" : "4151" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "747", "path" : "(lxpolkit)", "maj_flt" : "0", "cpu_usage" : "0.001083", "rss" : "2750" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "750", "path" : "(lxpanel)", "maj_flt" : "0", "cpu_usage" : "0.086078", "rss" : "7407" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "756", "path" : "(pcmanfm)", "maj_flt" : "0", "cpu_usage" : "0.024362", "rss" : "5845" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "764", "path" : "(ssh-agent)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "72" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "793", "path" : "(gvfs-udisks2-vo)", "maj_flt" : "0", "cpu_usage" : "0.001805", "rss" : "2560" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "796", "path" : "(menu-cached)", "maj_flt" : "0", "cpu_usage" : "0.000361", "rss" : "1298" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "803", "path" : "(gvfs-afc-volume)", "maj_flt" : "0", "cpu_usage" : "0.000542", "rss" : "1801" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "808", "path" : "(gvfs-mtp-volume)", "maj_flt" : "0", "cpu_usage" : "0.000722", "rss" : "1175" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "812", "path" : "(gvfs-goa-volume)", "maj_flt" : "0", "cpu_usage" : "0.000361", "rss" : "1087" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "816", "path" : "(gvfs-gphoto2-vo)", "maj_flt" : "0", "cpu_usage" : "0.000542", "rss" : "1266" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "878", "path" : "(gvfsd-trash)", "maj_flt" : "0", "cpu_usage" : "0.001083", "rss" : "1762" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1010", "path" : "(apache2)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "760" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1011", "path" : "(apache2)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "760" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1150", "path" : "(sshd)", "maj_flt" : "0", "cpu_usage" : "0.004564", "rss" : "1570" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1160", "path" : "(sshd)", "maj_flt" : "0", "cpu_usage" : "0.052060", "rss" : "1050" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1163", "path" : "(bash)", "maj_flt" : "0", "cpu_usage" : "0.017171", "rss" : "956" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1302", "path" : "(sshd)", "maj_flt" : "0", "cpu_usage" : "0.005363", "rss" : "1571" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1312", "path" : "(sshd)", "maj_flt" : "0", "cpu_usage" : "0.072630", "rss" : "1048" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "1315", "path" : "(bash)", "maj_flt" : "0", "cpu_usage" : "0.006191", "rss" : "944" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "5045", "path" : "(kworker/1:0-events)", "maj_flt" : "0", "cpu_usage" : "0.005345", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "7958", "path" : "(kworker/0:2-events)", "maj_flt" : "0", "cpu_usage" : "0.007393", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10296", "path" : "(sudo)", "maj_flt" : "0", "cpu_usage" : "0.000599", "rss" : "830" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10301", "path" : "(nano)", "maj_flt" : "0", "cpu_usage" : "0.009291", "rss" : "920" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10373", "path" : "(kworker/0:2H)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10463", "path" : "(kworker/3:0H)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10483", "path" : "(kworker/u8:1-phy0)", "maj_flt" : "0", "cpu_usage" : "0.357019", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10484", "path" : "(kworker/2:0H)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10497", "path" : "(python3)", "maj_flt" : "0", "cpu_usage" : "0.286891", "rss" : "5746" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10567", "path" : "(kworker/0:1)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10601", "path" : "(kworker/3:1-mm_percpu_wq)", "maj_flt" : "0", "cpu_usage" : "0.005231", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10602", "path" : "(kworker/u8:2-cfg80211)", "maj_flt" : "0", "cpu_usage" : "0.004036", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10603", "path" : "(kworker/1:1-events)", "maj_flt" : "0", "cpu_usage" : "0.020856", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10604", "path" : "(kworker/2:1-mm_percpu_wq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10727", "path" : "(kworker/1:2H)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10728", "path" : "(kworker/3:0-events)", "maj_flt" : "0", "cpu_usage" : "0.007591", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10729", "path" : "(kworker/1:2-events)", "maj_flt" : "0", "cpu_usage" : "0.033807", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10731", "path" : "(kworker/u8:0-events_unbound)", "maj_flt" : "0", "cpu_usage" : "0.214054", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10732", "path" : "(kworker/2:2-mm_percpu_wq)", "maj_flt" : "0", "cpu_usage" : "0.000000", "rss" : "0" }, { "IP" : "192.168.0.29", "timestamp" : "1599487338", "pid" : "10733", "path" : "(list_json)", "maj_flt" : "0", "cpu_usage" : "3.378423", "rss" : "361" }];

    var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');
     _th_name = document.createElement('th'),
_th_.setAttribute("id", "process_name");



// Builds the HTML Table out of myList json data from Ivy restful service.
    function buildHtmlTable(arr) {
    var table = _table_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
    for (var i=0, maxi=arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j=0, maxj=columns.length; j < maxj ; ++j) {
    var td = _td_.cloneNode(false);
    cellValue = arr[i][columns[j]];
    td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
    tr.appendChild(td);
}
    table.appendChild(tr);
}
    return table;
}

    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records
    function addAllColumnHeaders(arr, table)
    {
        var columnSet = [],
        tr = _tr_.cloneNode(false);
        for (var i=0, l=arr.length; i < l; i++) {
        for (var key in arr[i]) {
        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);

        if (i=3){
            th.style.width="50px";
        }
    }
    }
    }
        table.appendChild(tr);
        return columnSet;
    }


    //document.getElementById('list11').appendChild(buildHtmlTable(
  //  myList
  //  ));


