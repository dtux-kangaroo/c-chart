const Cookie = {
  getCookie: function(name) {
    const arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  },

  deleteCookie: function(name, domain, path) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var domain = domain || document.domain;
    var path = path || "/";
    document.cookie = name + "=; expires=" + d + "; domain=" + domain + "; path=" + path;
  },

  deleteAllCookies: function(domain, path) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
      console.log("delete:", cookies[i].split("=")[0], path, domain)
      if (cookies[i]) {
        this.deleteCookie(cookies[i].split("=")[0], path, domain);
      }
  },

  setCookie: function(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },
};

export default Cookie;
