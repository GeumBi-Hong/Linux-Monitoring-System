function sess (obj) {

    sessionStorage.setItem("cur_single_IP",obj.getAttribute('ip_number'));
    console.log(sessionStorage.getItem("cur_single_IP"));

   return true ;

}